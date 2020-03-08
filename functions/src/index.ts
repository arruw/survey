import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as fs from 'fs-extra';
import * as os from 'os';
import * as path from 'path';
import * as json2csv from 'json2csv';
import * as flat from 'flat';

admin.initializeApp();
const db = admin.firestore();

const bucket = 'development-269916-shared';
const schedule = functions.pubsub.schedule('*/5 * * * *').timeZone('Europe/Ljubljana');

export const psqiExporter = schedule.onRun(async (context) => {
  await exportSurveyData('psqi', [
    'timestamp._seconds',
    'scoring.c1',
    'scoring.c2', 
    'scoring.c3',
    'scoring.c4',
    'scoring.c5',
    'scoring.c6',
    'scoring.c7',
    'scoring.total',
  ]);

  return null;
});

// export const dassExporter = schedule.onRun(async (context) => {
//   await exportSurveyData('psqi', [
//     'timestamp._seconds',
//     'scoring.c1',
//     'scoring.c2', 
//     'scoring.c3',
//     'scoring.c4',
//     'scoring.c5',
//     'scoring.c6',
//     'scoring.c7',
//     'scoring.total',
//   ]);

//   return null;
// });

// export const leafqExporter = schedule.onRun(async (context) => {
//   await exportSurveyData('psqi', [
//     'timestamp._seconds',
//     'scoring.c1',
//     'scoring.c2', 
//     'scoring.c3',
//     'scoring.c4',
//     'scoring.c5',
//     'scoring.c6',
//     'scoring.c7',
//     'scoring.total',
//   ]);

//   return null;
// });

const exportSurveyData = async (surveyId: string, fields: string[]) => {
  const now  = admin.firestore.Timestamp.now();
  const metadataRef = db.collection('/surveys').doc(surveyId).withConverter(SurveyMetadata.converter);
  const dataRef = db.collection(`/surveys/${surveyId}/responses`);

  const metadata = (await metadataRef.get()).data();
  const initialRun: boolean = !metadata?.lastRun;

  if(initialRun) {
    console.log('Starting initial run...');
  } else {
    console.log('Starting next run...')
  }

  // Build query
  console.log('Constructing query...');
  let query = dataRef
    .orderBy('timestamp', 'desc')
    .where('timestamp', '<=', now);
  if (!initialRun) {
    query = query
      .where('timestamp', '>', metadata?.lastRun);
  }

  // Read new data only
  console.log('Reading data...');
  const newData: any[] = [];
  (await query.get()).forEach((doc) => {
    newData.push(flat(doc.data()));
  });
  
  if(newData.length === 0) {
    console.log('No new data, skipping...');
    return;
  }
  console.log('New data to process: ' + newData.length);

  const newFilePathRemote = `surveys/${surveyId}-${now.seconds}.csv`;
  const newFilePathLocal = path.join(os.tmpdir(), newFilePathRemote);
  
  // Ensure that local path exists
  console.log('Ensuring local folder structure...');
  await fs.mkdirp(path.dirname(newFilePathLocal));

  // Download previous data
  if(!initialRun) {
    console.log('Downloading old data...');
    const prevFilePathRemote = `surveys/${surveyId}-${metadata?.lastRun.seconds}.csv`;
    await admin.storage().bucket(bucket).file(prevFilePathRemote).download({
      destination: newFilePathLocal
    });
  }

  // Append to previous data
  console.log('Appending new data...');
  await fs.appendFile(newFilePathLocal, (await json2csv.parseAsync(newData, {
    fields: fields,
    header: initialRun,
  }))+'\n');

  // Store CSV and metadata
  console.log('Uploading CSV...');
  await admin.storage().bucket(bucket).upload(newFilePathLocal, {
    destination: newFilePathRemote
  });
  console.log('Updating metadata...'); 
  await metadataRef.set({
    lastRun: now,
    rows: (metadata?.rows ?? 0) + newData.length
  }, {
    merge: true
  });

};

class SurveyMetadata {
  lastRun: FirebaseFirestore.Timestamp;
  rows: number;

  constructor(lastRun: FirebaseFirestore.Timestamp, rows: number) {
    this.lastRun = lastRun;
    this.rows = rows;
  };

  toString = () => `lastRun: ${this.lastRun.toDate()}, rows: ${this.rows}`;

  static converter: FirebaseFirestore.FirestoreDataConverter<SurveyMetadata> = {
    toFirestore: (data: SurveyMetadata) => { 
      return {
        lastRun: data.lastRun,
        rows: data.rows,
      }
     },
    fromFirestore: (data: FirebaseFirestore.DocumentData) => new SurveyMetadata(data.lastRun, data.rows)
  };
}


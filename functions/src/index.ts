import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as fs from 'fs-extra';
import * as os from 'os';
import * as path from 'path';
import * as json2csv from 'json2csv';
import * as flat from 'flat';

admin.initializeApp();
const db = admin.firestore();
const bucket = admin.storage().bucket();

const schedule = functions.pubsub.schedule('0 * * * *').timeZone('Europe/Ljubljana');

export const psqiCsvExporter = schedule.onRun(async (context) => {
  await exportSurveyData('psqi', [
    'timestamp._seconds',
    'q01',
    'q02',
    'q03',
    'q04',
    'q05.a',
    'q05.b',
    'q05.c',
    'q05.d',
    'q05.e',
    'q05.f',
    'q05.g',
    'q05.h',
    'q05.i',
    'q06',
    'q07',
    'q08',
    'q09',
    'q10',
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

// export const dassCsvExporter = schedule.onRun(async (context) => {
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

// export const leafqCsvExporter = schedule.onRun(async (context) => {
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

  const gzip = true;
  const fileExt = 'csv';
  const sharableFilePathRemote = `surveys/${surveyId}.${fileExt}`;
  const newFilePathRemote = `surveys/${surveyId}-${now.seconds}.${fileExt}`;
  const newFilePathRemoteChunk = `surveys/${surveyId}-${now.seconds}-chunk.${fileExt}`;
  const newFilePathLocal = path.join(os.tmpdir(), newFilePathRemote);
  
  // Ensure that local path exists
  console.log('Ensuring local folder structure...');
  await fs.mkdirp(path.dirname(newFilePathLocal));

  // Append to previous data
  console.log('Appending new data...');
  await fs.writeFile(newFilePathLocal, (await json2csv.parseAsync(newData, {
    fields: fields,
    header: initialRun,
  }))+'\n');

  // Append new CSV data
  console.log('Uploading new CSV chunk...');
  await bucket.upload(newFilePathLocal, {
    destination: newFilePathRemoteChunk,
    gzip: gzip,
  });
  console.log('Appending CSV data...');
  const combineFiles: string[] = [];
  if (!initialRun) {
    const prevFilePathRemote = `surveys/${surveyId}-${metadata?.lastRun.seconds}.${fileExt}`;
    combineFiles.push(prevFilePathRemote);
  } 
  await bucket.combine([ ...combineFiles, newFilePathRemoteChunk ], newFilePathRemote);
  console.log('Cleanup...');
  combineFiles.forEach(async file => await bucket.file(file).delete());
  await bucket.file(newFilePathRemoteChunk).delete();
  
  // Create sharable CSV file
  console.log('Creating sharable CSV file...');
  if (!initialRun) {
    await bucket.file(sharableFilePathRemote).delete();
  } 
  const [sharableFile] = await bucket.combine([ newFilePathRemote ], sharableFilePathRemote);
  await sharableFile.setMetadata({
    contentType: 'text/csv',
    contentEncoding: gzip ? 'gzip' : null,
    cacheControl: 'public, max-age=3600',
  });

  // Update metadata
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


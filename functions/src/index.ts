import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as fs from 'fs-extra';
import * as os from 'os';
import * as path from 'path';
import * as json2csv from 'json2csv';
import * as flat from 'flat';
import * as express from 'express';
import * as cors from 'cors';
// import * as Collections from 'typescript-collections';

const ex = express();
ex.use(cors({ origin: true }));

admin.initializeApp();
const db = admin.firestore();

const allowedSurveys = ['psqi'];

ex.get('/export/:id', async (req, res) => {
  console.log('Exporting CSV data ...');

  const surveyId = req.params.id;

  if(!surveyId || allowedSurveys.indexOf(surveyId) === -1) {
    res
      .status(400)
      .send('Invalid request parameter :id');
    return;
  } 

  const filePath = await saveFileToTmp(`export/${surveyId}.csv`, 
    await extractCsvFromCollection(`/surveys/${surveyId}/responses`));

  res
    // .set('Cache-Control', 'public, max-age=3600, s-maxage=3600')
    .download(filePath, `${surveyId}-${admin.firestore.Timestamp.now().toMillis()}.csv`, {
      maxAge: 3600
    });
});

export const api2 = functions.https.onRequest(ex);


// export const csvExporter = functions.pubsub.schedule('*/5 * * * *').timeZone('Europe/Ljubljana').onRun(async (context) => {
//   console.log('This will be run every 5 minutes!');
//   const configDocRef = db.collection('/metadata').doc('csvExporter').withConverter(CsvExporter.converter);
//   const surveisRef = db.collection('/survey');

//   // let initial = false;
//   let config = await configDocRef.get();
//   if(!config.exists) {
//     console.log('First run, initializing...');
//     const initData = new CsvExporter(FirebaseFirestore.Timestamp.now(), 0);
//     await configDocRef.set(initData);
//     config = await configDocRef.get();
//     // initial = true;
//   }

//   const data: any[] = [];
//   (await surveisRef.orderBy('timestamp', 'desc').get()).forEach((doc) => {
//     data.push(flat(doc.data()));
//   });

//   await saveFile('reports/neki.csv', );

//   return null;
// });

// const saveFileToStorage = async (filePath: string, data: string) => {
//   await saveFileToTmp(filePath, data);
//   await admin.storage().bucket().upload(tempFilePath, { destination: filePath });
// }

const saveFileToTmp = async (filePath: string, data: string) => {
  const tempFilePath = path.join(os.tmpdir(), filePath);
  await fs.outputFile(tempFilePath, data);
  return tempFilePath;
}

const extractCsvFromCollection = async (collection: string, timestampField: string = 'timestamp') => {
  const collectionRef = db.collection(collection);

  const fields: string[] = [];
  const data: any[] = [];
  (await collectionRef.orderBy(timestampField, 'asc').get()).forEach((doc) => {
    const row: any = flat(doc.data());

    for (const field in row) {
      if (row.hasOwnProperty(field)) {
        if (field === timestampField || fields.indexOf(field) !== -1) continue;
        fields.push(field);
      }
    }

    data.push(row);
  });

  return await json2csv.parseAsync(data, {
    fields: [timestampField, ...fields.sort()],
  }); 
}

// class CsvExporter {
//   lastRun: FirebaseFirestore.Timestamp;
//   rows: number;

//   constructor(lastRun: FirebaseFirestore.Timestamp, rows: number) {
//     this.lastRun = lastRun;
//     this.rows = rows;
//   };

//   toString = () => `lastRun: ${this.lastRun.toDate()}, rows: ${this.rows}`;

//   static converter: FirebaseFirestore.FirestoreDataConverter<CsvExporter> = {
//     toFirestore: (data: CsvExporter) => { 
//       return {
//         lastRun: data.lastRun,
//         rows: data.rows,
//       }
//      },
//     fromFirestore: (data: FirebaseFirestore.DocumentData) => new CsvExporter(data.lastRun, data.rows)
//   };
// }


import app from 'firebase/app';
import 'firebase/firestore';
import 'firebase/functions';
import 'firebase/auth';

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

export default class Firebase {
  private firestore: app.firestore.Firestore;
  private functions: app.functions.Functions;
  private auth: app.auth.Auth;
  private functionsBaseUrl: string = `https://us-central1-${config.projectId}.cloudfunctions.net`;

  constructor() {
    app.initializeApp(config);
    this.firestore = app.firestore()
    this.functions = app.functions();
    this.auth = app.auth();
  }

  saveSurveyResponse = async (survey: string, response: any) => {
    const identity = await this.auth.signInAnonymously();
    this.firestore.collection(`/surveys/${survey}/responses`).doc(identity.user?.uid).set({
      ...response,
      timestamp: app.firestore.FieldValue.serverTimestamp(),
    });
  };
}
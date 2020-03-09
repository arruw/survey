import app from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
// import 'firebase/analytics';

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
  private auth: app.auth.Auth;
  // private analytics: app.analytics.Analytics;

  constructor() {
    app.initializeApp(config);
    this.firestore = app.firestore()
    this.auth = app.auth();
    // this.analytics = app.analytics();
  }

  saveSurveyResponse = async (survey: string, response: any) => {
    if (!this.auth.currentUser) await this.auth.signInAnonymously();
    this.firestore.collection(`/surveys/${survey}/responses`).doc(this.auth.currentUser?.uid).set({
      ...response,
      timestamp: app.firestore.FieldValue.serverTimestamp(),
    });
  };

  // logEvent = this.analytics.logEvent;
}
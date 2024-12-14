import firebase from 'firebase';

// Your Firebase configuration
// const firebaseConfig = {
//   apiKey: process.env.FIREBASE_API_KEY,
//   authDomain: process.env.FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.FIREBASE_PROJECT_ID,
//   storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.FIREBASE_APP_ID,
//   databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
// };
debugger
const firebaseConfig = {
  databaseURL: 'https://edudocbc-default-rtdb.firebaseio.com/',
};

firebase.initializeApp(firebaseConfig);
var database = firebase.database();

export default database;


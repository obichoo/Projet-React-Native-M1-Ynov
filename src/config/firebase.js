import {initializeApp} from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyBx0jCQfYOFmsWlkrkq1aTY00CRcSG6EXk',
  authDomain: 'notes-app-3661c.firebaseapp.com',
  projectId: 'notes-app-3661c',
  storageBucket: 'notes-app-3661c.appspot.com',
  messagingSenderId: '890173480010',
  appId: '1:890173480010:web:80fe01e58203fe193c5ab3',
  measurementId: 'G-9JY3ETJ9T4',
};

const firebase = initializeApp(firebaseConfig);

export default firebase;

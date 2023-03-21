import {initializeApp} from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyCfmsQnUSKssvd2PdTqX6Xqw2gNGYld_V8',
  authDomain: 'notes-app-638d6.firebaseapp.com',
  projectId: 'notes-app-638d6',
  storageBucket: 'notes-app-638d6.appspot.com',
  messagingSenderId: '571363894759',
  appId: '1:571363894759:web:5f5c8aaaa5b8d08c500942',
};

const firebase = initializeApp(firebaseConfig);

export default firebase;

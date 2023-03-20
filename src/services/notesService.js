import {collection, addDoc} from 'firebase/firestore';
import firebase from '../config/firebase';

const createNote = async (title, content, userId) => {
  const notesRef = collection(firebase.firestore(), 'notes');
  const newNoteRef = await addDoc(notesRef, {
    title,
    content,
    userId,
    createdAt: new Date(),
  });
  console.log('New note created with ID: ', newNoteRef.id);
};

import {getAuth} from 'firebase/auth';
import {
  addDoc,
  collection,
  getDoc,
  getDocs,
  getFirestore,
  setDoc,
} from 'firebase/firestore';
import {firebase} from '../config/firebase';

export const createNote = async (title, content, userId) => {
  const db = getFirestore(firebase);
  const notesRef = collection(db, 'notes');
  const note = {
    title,
    content,
    userId,
  };
  await addDoc(notesRef, note);
};

export const getCurrentUserNotes = async userId => {
  const db = getFirestore(firebase);
  const notesRef = collection(db, 'notes');
  const notesSnapshot = await getDocs(notesRef);
  const notes = [];
  notesSnapshot.forEach(doc => {
    const note = doc.data();
    if (note.userId === userId) {
      notes.push(note);
    }
  });
  return notes;
};

export const getCurrentUser = () => {
  const auth = getAuth(firebase);
  return auth.currentUser;
};

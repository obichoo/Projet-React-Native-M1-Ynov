import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const createNote = async (
  title,
  content,
  isPinned,
  password = null,
  remind,
) => {
  const userId = auth().currentUser.uid;
  await AsyncStorage.getItem('fcmToken').then(async fcmToken => {
    await firestore().collection('notes').add({
      title,
      content,
      isPinned,
      password,
      remind,
      userId,
      fcmToken,
      date: Date.now(),
    });
  });

  return true;
};

export const editNote = async (
  id,
  title,
  content,
  isPinned,
  password = null,
  remind,
) => {
  await AsyncStorage.getItem('fcmToken').then(async fcmToken => {
    await firestore().collection('notes').doc(id).update({
      title,
      content,
      isPinned,
      password,
      remind,
      fcmToken,
      date: Date.now(),
    });
  });

  return true;
};

export const deleteNote = async id => {
  await firestore().collection('notes').doc(id).delete();

  return true;
};

export const fetchNotesByQuery = async query => {
  const userId = auth().currentUser.uid;
  const userNotes = await firestore()
    .collection('notes')
    .where('title', '>=', query)
    .where('title', '<=', query + '\uf8ff')
    .get()
    .then(querySnapshot => {
      const notes = [];
      querySnapshot.forEach(doc => {
        const note = doc.data();
        note.id = doc.id;
        if (note.userId === userId) notes.push(note);
      });
      return notes;
    });

  userNotes.sort((a, b) => b.date - a.date);

  return userNotes.sort((a, b) => {
    if (a.isPinned && !b.isPinned) {
      return -1;
    } else if (!a.isPinned && b.isPinned) {
      return 1;
    } else {
      return 0;
    }
  });
};

export const getCurrentUserNotes = async () => {
  const userId = auth().currentUser.uid;
  const userNotes = await firestore()
    .collection('notes')
    .where('userId', '==', userId)
    .get()
    .then(querySnapshot => {
      const notes = [];
      querySnapshot.forEach(doc => {
        const note = doc.data();
        note.id = doc.id;
        notes.push(note);
      });
      return notes;
    });

  userNotes.sort((a, b) => b.date - a.date);

  return userNotes.sort((a, b) => {
    if (a.isPinned && !b.isPinned) {
      return -1;
    } else if (!a.isPinned && b.isPinned) {
      return 1;
    } else {
      return 0;
    }
  });
};

export const getCurrentUser = () => {
  return auth().currentUser;
};

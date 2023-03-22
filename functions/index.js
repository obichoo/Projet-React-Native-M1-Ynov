const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

exports.sendNotificationOnNoteUpdate = functions.firestore
  .document('notes/{noteId}')
  .onUpdate((change, context) => {
    const note = change.after.data();
    if (note.remind === true) {
      const title = note.title;
      const content = note.content;
      const message = {
        notification: {
          title: title,
          body: content,
        },
        topic: note.fcmToken,
      };
      return admin.messaging().send(message);
    } else {
      return null;
    }
  });

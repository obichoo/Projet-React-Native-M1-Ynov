import React, {useState} from 'react';
import Button from '../../components/Button';
import {
  createNote,
  getCurrentUser,
  getCurrentUserNotes,
} from '../../services/notesService';
import Input from '../../components/Input';
import Spacing from '../../components/Spacing';
import BackButton from '../../components/BackButton';

export default function CreateNote() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [currentUser, setCurrentUser] = useState(getCurrentUser());

  const handleSaveNote = async () => {
    await createNote(title, content, currentUser.uid);
  };

  return (
    <>
      <BackButton>Revenir à la liste des notes</BackButton>
      <Spacing size={16} />
      <Input width="100%" name="Titre" value={title} onChange={setTitle} />
      <Input
        width="100%"
        name="Contenu"
        value={content}
        onChange={setContent}
        multiline={true}
      />
      <Spacing size={16} />
      <Button title="Save" onPress={handleSaveNote} />
    </>
  );
}

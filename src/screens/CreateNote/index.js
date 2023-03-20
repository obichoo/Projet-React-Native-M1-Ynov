import React, {useState, useEffect} from 'react';
import Title from '../../components/Title';
import Button from '../../components/Button';
import createNote from '../../services/notesService';
import styled from 'styled-components';
import {getAuth, onAuthStateChanged} from 'firebase/auth';
import firebase from '../../config/firebase';
import Input from '../../components/Input';

export default function CreateNote() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [currentUser, setCurrentUser] = useState(null);

  const handleSaveNote = async () => {
    try {
      await createNote(title, content, currentUser.uid);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const auth = getAuth(firebase);

    const unsubscribe = onAuthStateChanged(auth, user => {
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  return (
    <>
      <Title>Créer une note</Title>
      <Input name="Titre" value={title} onChange={setTitle} />
      <Input
        name="Contenu"
        value={content}
        onChange={setContent}
        multiline={true}
      />
      <Button title="Save" onPress={handleSaveNote} />
    </>
  );
}

const StyledTextInput = styled.TextInput`
  background-color: #fff;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
`;

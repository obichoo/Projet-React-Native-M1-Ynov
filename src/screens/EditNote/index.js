import React, {useState} from 'react';
import Button from '../../components/Button';
import {editNote, deleteNote} from '../../services/notesService';
import Input from '../../components/Input';
import Spacing from '../../components/Spacing';
import BackButton from '../../components/BackButton';
import ErrorText from '../../components/ErrorText';
import CheckboxInput from '../../components/Checkbox';
import styled from 'styled-components';
import {Share} from 'react-native';
import Toast from 'react-native-toast-message';

const EditNote = ({navigation, route}) => {
  const noteTitle = route.params.note.title;
  const noteContent = route.params.note.content;
  const noteId = route.params.note.id;
  const noteIsPinned = route.params.note.isPinned || false;
  const notePassword = route.params.note.password || '';
  const noteRemind = route.params.note.remind || false;
  const [title, setTitle] = useState(noteTitle);
  const [content, setContent] = useState(noteContent);
  const [isPinned, setIsPinned] = useState(noteIsPinned);
  const [password, setPassword] = useState(notePassword);
  const [remind, setRemind] = useState(noteRemind);
  const [error, setError] = useState('');
  const [editingNote, setEditingNote] = useState(false);
  const [deletingNote, setDeletingNote] = useState(false);
  const [sharingNote, setSharingNote] = useState(false);

  const handleEditNote = async () => {
    if (!title) {
      setError('Le titre est obligatoire');
      return;
    }

    if (!content) {
      setError('Le contenu est obligatoire');
      return;
    }

    setEditingNote(true);

    try {
      await editNote(noteId, title, content, isPinned, password, remind);
      Toast.show({
        type: 'success',
        text1: 'Note modifiée',
        text2: `La note "${title}" a bien été modifiée`,
        position: 'bottom',
      });
      setEditingNote(false);
      navigation.navigate('Home');
    } catch (err) {
      console.error(err);
      setEditingNote(false);
      Toast.show({
        type: 'error',
        text1: 'Erreur lors de la modification de la note',
        text2: `Une erreur est survenue lors de la modification de la note "${title}"`,
        position: 'bottom',
      });
      setEditingNote(false);
    }
  };

  const handleDeleteNote = async () => {
    setDeletingNote(true);
    try {
      await deleteNote(noteId);
      Toast.show({
        type: 'success',
        text1: 'Note supprimée',
        text2: `La note "${title}" a bien été supprimée`,
        position: 'bottom',
      });
      setDeletingNote(false);
      navigation.navigate('Home');
    } catch (err) {
      console.error(err);
      Toast.show({
        type: 'error',
        text1: 'Erreur',
        text2: `La note "${title}" n'a pas pu être supprimée`,
        position: 'bottom',
      });
      setDeletingNote(false);
    }
  };

  const shareNote = async () => {
    setSharingNote(true);
    try {
      await Share.share({
        message: `Titre: ${title} \n Contenu: ${content}`,
      }).finally(() => {
        setTimeout(() => {
          setSharingNote(false);
        }, 1500);
      });
    } catch (err) {
      console.log(err.message);
      setSharingNote(false);
    }
  };

  return (
    <>
      <BackButton>Revenir à la liste des notes</BackButton>
      <Spacing size={16} />
      <Input
        width="100%"
        name="Titre"
        mandatory={true}
        value={title}
        onChange={setTitle}
      />
      <Spacing size={8} />
      <Input
        width="100%"
        mandatory={true}
        name="Contenu"
        value={content}
        onChange={setContent}
        multiline={true}
      />
      <Spacing size={8} />
      <Input
        width="100%"
        type="password"
        name="Protéger avec un mot de passe"
        value={password}
        onChange={setPassword}
      />
      <Spacing size={8} />
      <CheckboxInput
        label="Epingler la note"
        checked={isPinned}
        onChange={() => setIsPinned(!isPinned)}
      />
      <Spacing size={8} />
      <CheckboxInput
        label="Me rappeller cette note à la fermeture de l'application"
        checked={remind}
        onChange={() => setRemind(!remind)}
      />
      <Spacing size={4} />
      {error !== '' && <ErrorText width={150}>{error}</ErrorText>}
      <Spacing size={8} />
      <Button
        title="Modifier la note"
        loading={editingNote}
        width={130}
        onPress={handleEditNote}
      />
      <NoteButtons>
        <Button
          title="Partager la note"
          loading={sharingNote}
          width={130}
          bgColor={'#5af'}
          onPress={() => shareNote()}
        />

        <Button
          title="Supprimer la note"
          width={130}
          loading={deletingNote}
          onPress={handleDeleteNote}
          bgColor={'red'}
        />
      </NoteButtons>
    </>
  );
};

const NoteButtons = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin-top: 50px;
`;

export default EditNote;

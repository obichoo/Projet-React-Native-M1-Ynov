import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import Button from '../../components/Button';
import Input from '../../components/Input';
import PasswordModal from '../../components/PasswordModal';
import {
  getCurrentUserNotes,
  fetchNotesByQuery,
} from '../../services/notesService';

const Home = ({navigation}) => {
  const [notes, setNotes] = useState([]);
  const [query, setQuery] = useState('');
  const [needPassword, setNeedPassword] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState(null);

  useEffect(() => {
    getCurrentUserNotes().then(userNotes => {
      setNotes(userNotes);
    });
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      const userNotes = await getCurrentUserNotes();
      setNotes(userNotes);
    });

    return unsubscribe;
  }, [navigation]);

  const handleFetchNotes = async () => {
    const notes = await fetchNotesByQuery(query);
    setNotes(notes);
  };

  const goToNote = note => () => {
    if (note.password) {
      setNoteToEdit(note);
      setNeedPassword(true);
      return;
    }

    navigation.navigate('EditNote', {note});
  };

  const closePasswordModal = () => {
    setNeedPassword(false);
    setNoteToEdit(null);
    getCurrentUserNotes().then(userNotes => {
      setNotes(userNotes);
    });
  };

  useEffect(() => {
    handleFetchNotes();
  }, [query]);

  return (
    <>
      <CenteredView>
        <Button
          title={'+   Créer une nouvelle note'}
          bgColor={'#000'}
          width={200}
          onPress={() => navigation.navigate('CreateNote')}
        />
      </CenteredView>

      <SearchBar>
        <Input
          width="100%"
          name="Rechercher une note"
          value={query}
          onChange={setQuery}
        />
      </SearchBar>

      <NotesList>
        {notes.map(note => (
          <Note key={note.id}>
            {note.isPinned && <PinnedIcon>&#10084;</PinnedIcon>}
            {note.password && <PasswordIcon>&#10033;</PasswordIcon>}
            {note.remind && <PhoneIcon>&#9742;</PhoneIcon>}
            <Button
              title={note.title}
              bgColor={'transparent'}
              color={'black'}
              width={'100%'}
              alignText={'left'}
              onPress={goToNote(note)}
            />
          </Note>
        ))}
      </NotesList>

      {needPassword && (
        <PasswordModal onClose={() => closePasswordModal()} note={noteToEdit} />
      )}
    </>
  );
};

const CenteredView = styled.View`
  margin: auto;
  margin-bottom: 10px;
`;

const NotesList = styled.ScrollView`
  width: 100%;
  margin-top: 20px;
`;

const Note = styled.View`
  width: 100%;
  margin-bottom: 10px;
  border: 1px solid #000;
  border-radius: 4px;
  padding: 4px 8px;
  flex-direction: row;
  align-items: center;
`;

const PinnedIcon = styled.Text`
  font-size: 12px;
  color: #000;
  margin-right: 8px;
`;

const PasswordIcon = styled.Text`
  font-size: 12px;
  color: #000;
  margin-right: 8px;
`;

const PhoneIcon = styled.Text`
  font-size: 12px;
  color: #000;
  margin-right: 8px;
`;

const SearchBar = styled.View``;

export default Home;

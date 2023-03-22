import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import Button from '../../components/Button';
import Input from '../../components/Input';
import PasswordModal from '../../components/PasswordModal';
import Spacing from '../../components/Spacing';
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
    try {
      getCurrentUserNotes().then(userNotes => {
        setNotes(userNotes);
      });
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      try {
        const userNotes = await getCurrentUserNotes();
        setNotes(userNotes);
      } catch (error) {
        console.error(error);
      }
    });

    return unsubscribe;
  }, [navigation]);

  const handleFetchNotes = async () => {
    const searchedNotes = await fetchNotesByQuery(query);
    setNotes(searchedNotes);
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

  const goToReviews = () => {
    navigation.navigate('Reviews');
  };

  useEffect(() => {
    handleFetchNotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <Spacing size={30} />
      </NotesList>

      <BottomButton>
        <Button
          width={120}
          onPress={() => goToReviews()}
          title={'Donner un avis'}
        />
      </BottomButton>

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

const BottomButton = styled.View`
  position: absolute;
  bottom: 10px;
  right: 20px;
`;

export default Home;

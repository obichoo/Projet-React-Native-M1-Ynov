import React, {useState} from 'react';
import {Modal} from 'react-native';
import Title from '../Title';
import Input from '../Input';
import Button from '../Button';
import ErrorText from '../ErrorText';
import styled from 'styled-components';
import {useNavigation} from '@react-navigation/native';
import Spacing from '../Spacing';
import {deleteNote} from '../../services/notesService';

const PasswordModal = ({error = false, note, onClose}) => {
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordTries, setPasswordTries] = useState(0);
  const navigation = useNavigation();

  const checkPassword = () => {
    if (note.password !== password) {
      setPasswordError(true);
      setPasswordTries(passwordTries + 1);
      return;
    }

    onClose();

    navigation.navigate('EditNote', {note});
  };

  const handleDeleteNote = async () => {
    const noteId = note.id;
    await deleteNote(noteId);
    onClose();
    navigation.navigate('Home');
  };

  return (
    <Modal animationType="fade" transparent>
      <ModalBackground>
        <ModalContent>
          <Title>Mot de passe de la note</Title>
          <Input
            width="100%"
            value={password}
            onChange={setPassword}
            name=""
            type="password"
          />
          {passwordError && (
            <>
              <Spacing size={8} />
              <ErrorText width={150}>Mot de passe incorrect</ErrorText>
            </>
          )}
          <ButtonsContainer>
            <Button title="Annuler" bgColor="red" onPress={onClose} />
            <Button
              title="Valider"
              bgColor="#000"
              onPress={() => checkPassword()}
            />
          </ButtonsContainer>

          {passwordTries >= 3 && (
            <>
              <Spacing size={8} />
              <ErrorText width={'100%'} textAlign={'center'}>
                Nombre de tentatives élevé, voulez-vous supprimer la note ?
              </ErrorText>
              <Spacing size={8} />
              <Button
                width={'100%'}
                title="Supprimer"
                bgColor="red"
                onPress={() => handleDeleteNote()}
              />
            </>
          )}
        </ModalContent>
      </ModalBackground>
    </Modal>
  );
};

const ModalBackground = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.View`
  background-color: #fff;
  border-radius: 8px;
  padding: 16px;
  width: 80%;
`;

const ButtonsContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  margin-top: 16px;
`;

export default PasswordModal;

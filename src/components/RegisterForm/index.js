import React, {useState} from 'react';
import styled from 'styled-components';
import Input from '../Input';
import Button from '../Button';
import Spacing from '../Spacing';
import ErrorText from '../ErrorText';
import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth';
import firebase from '../../config/firebase';
export default function RegisterForm({onSuccessSubmit}) {
  const [user, setUser] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const submitRegistration = async () => {
    try {
      const auth = getAuth(firebase);
      await createUserWithEmailAndPassword(
        auth,
        `${user.username}@gmail.com`,
        user.password,
      ).then(userCredential => onSuccessSubmit(userCredential));
    } catch (responseError) {
      setError(responseError.message);
    }
  };

  return (
    <StyledInputForm>
      <Input
        name={"Nom d'utilisateur"}
        value={user.username}
        onChange={e => setUser({...user, username: e})}
      />
      {submitted && user.username.length < 3 && (
        <ErrorText>Nom d'utilisateur trop court</ErrorText>
      )}
      <Spacing size={8} />
      <Input
        name={'Mot de passe'}
        type={'password'}
        value={user.password}
        onChange={e => setUser({...user, password: e})}
      />
      {submitted && user.password.length < 8 && (
        <ErrorText>Mot de passe trop court</ErrorText>
      )}
      <Spacing />
      {error ? <ErrorText>{error}</ErrorText> : null}
      <Button
        width={150}
        onPress={() => {
          setSubmitted(true);
          if (user.username.length >= 3 && user.password.length >= 8) {
            submitRegistration();
          }
        }}
        title={"S'inscrire"}
        bgColor={'black'}
      />
    </StyledInputForm>
  );
}

const StyledInputForm = styled.View``;

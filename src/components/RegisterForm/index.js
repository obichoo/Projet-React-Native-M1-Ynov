import React, {useState} from 'react';
import styled from 'styled-components';
import Input from '../Input';
import Button from '../Button';
import Spacing from '../Spacing';
import ErrorText from '../ErrorText';
import auth from '@react-native-firebase/auth';

const RegisterForm = ({onSuccessSubmit}) => {
  const [user, setUser] = useState({
    username: 'aubin',
    password: 'aubin77340',
  });
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const errorsLabels = {
    'auth/email-already-in-use': 'Email déjà utilisé',
  };

  const submitRegistration = async () => {
    auth()
      .createUserWithEmailAndPassword(
        `${user.username}@gmail.com`,
        user.password,
      )
      .then(userCredential => onSuccessSubmit(userCredential))
      .catch(error => {
        setError(errorsLabels[error.code]);
      });
  };

  return (
    <StyledInputForm>
      <Input
        name={"Nom d'utilisateur"}
        value={user.username}
        onChange={e => setUser({...user, username: e})}
      />
      {submitted && user.username.length < 3 && (
        <ErrorText width={150}>Nom d'utilisateur trop court</ErrorText>
      )}
      <Spacing size={8} />
      <Input
        name={'Mot de passe'}
        type={'password'}
        value={user.password}
        onChange={e => setUser({...user, password: e})}
      />
      <Spacing size={4} />
      {submitted && user.password.length < 8 && (
        <ErrorText width={150}>Mot de passe trop court</ErrorText>
      )}
      {error ? <ErrorText width={150}>{error}</ErrorText> : null}
      <Spacing size={8} />
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
};

const StyledInputForm = styled.View``;

export default RegisterForm;

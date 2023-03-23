import React, {useState} from 'react';
import styled from 'styled-components';
import Input from '../Input';
import Button from '../Button';
import Spacing from '../Spacing';
import ErrorText from '../ErrorText';
import auth from '@react-native-firebase/auth';
import Toast from 'react-native-toast-message';

const LoginForm = ({onSuccessSubmit}) => {
  const [user, setUser] = useState({
    username: '',
    password: '',
  });
  const [loging, setLoging] = useState(false);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const errorsLabels = {
    'auth/user-not-found': 'Utilisateur non trouvé',
    'auth/wrong-password': 'Mot de passe incorrect',
  };

  const submitLogin = async () => {
    setLoging(true);
    auth()
      .signInWithEmailAndPassword(`${user.username}@gmail.com`, user.password)
      .then(userCredential => {
        setLoging(false);
        onSuccessSubmit(userCredential);
      })
      .catch(err => {
        setError(errorsLabels[err.code]);
        setLoging(false);
        Toast.show({
          type: 'error',
          text1: 'Erreur',
          text2: errorsLabels[err.code],
          position: 'bottom',
        });
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
      {error !== '' && <ErrorText width={150}>{error}</ErrorText>}
      <Spacing size={8} />
      <Button
        width={150}
        onPress={() => {
          setSubmitted(true);
          if (user.username.length >= 3 && user.password.length >= 8) {
            submitLogin();
          }
        }}
        loading={loging}
        title={'Se connecter'}
        bgColor={'black'}
      />
    </StyledInputForm>
  );
};

const StyledInputForm = styled.View``;

export default LoginForm;

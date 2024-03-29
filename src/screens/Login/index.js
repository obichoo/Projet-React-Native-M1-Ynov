import React, {useState} from 'react';
import Title from '../../components/Title';
import Logo from '../../components/Logo';
import LoginForm from '../../components/LoginForm';
import styled from 'styled-components';
import Spacing from '../../components/Spacing';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '../../components/Button';
import RegisterForm from '../../components/RegisterForm';
import messaging from '@react-native-firebase/messaging';
import Toast from 'react-native-toast-message';

const Login = ({navigation}) => {
  const [currentForm, setCurrentForm] = useState('login');
  const handleLogin = async userCredential => {
    const idToken = await userCredential?.user?.getIdToken();
    if (!idToken) {
      return;
    } else {
      AsyncStorage.setItem('token', idToken);
      AsyncStorage.getItem('token').then(storedToken => {
        if (storedToken) {
          messaging()
            .getToken()
            .then(fcmToken => {
              AsyncStorage.setItem('fcmToken', fcmToken).then(() => {
                Toast.show({
                  type: 'success',
                  text1: 'Connexion réussie',
                  text2: `Bonjour ${userCredential.user.email.replace(
                    '@gmail.com',
                    '',
                  )} !`,
                  position: 'bottom',
                });
                navigation.navigate('Home');
              });
            })
            .catch(error => {
              console.error(
                `Erreur lors de la récupération du token FCM : ${error}`,
              );
            });
        }
      });
    }
  };

  const handleRegister = async userCredential => {
    const idToken = await userCredential.user.getIdToken();
    AsyncStorage.setItem('token', idToken);
    AsyncStorage.getItem('token').then(storedToken => {
      if (storedToken) {
        messaging()
          .getToken()
          .then(fcmToken => {
            AsyncStorage.setItem('fcmToken', fcmToken).then(() => {
              navigation.navigate('Home');
            });
          })
          .catch(error => {
            console.error(
              `Erreur lors de la récupération du token FCM : ${error}`,
            );
          });
      }
    });
  };

  const changeForm = () => {
    if (currentForm === 'login') {
      setCurrentForm('register');
    } else {
      setCurrentForm('login');
    }
  };

  return (
    <CenteredView>
      <Logo size={40} centered={true} />
      <Spacing size={32} />
      <Title>{currentForm === 'login' ? 'Connexion' : 'Inscription'}</Title>
      <Spacing size={8} />
      {(currentForm === 'login' && (
        <LoginForm onSuccessSubmit={handleLogin} />
      )) ||
        (currentForm === 'register' && (
          <RegisterForm onSuccessSubmit={handleRegister} />
        ))}
      <Spacing size={8} />
      <Button
        width={150}
        onPress={() => {
          changeForm();
        }}
        title={
          currentForm === 'login'
            ? "Je n'ai pas de compte"
            : "J'ai déjà un compte"
        }
        bgColor={'transparent'}
        color={'#000'}
      />
    </CenteredView>
  );
};

const CenteredView = styled.View`
  margin: auto;
`;

export default Login;

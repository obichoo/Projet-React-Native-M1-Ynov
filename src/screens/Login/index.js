import React from 'react';
import Title from '../../components/Title';
import Logo from '../../components/Logo';
import LoginForm from '../../components/LoginForm';
import styled from 'styled-components';
import Spacing from '../../components/Spacing';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login({title, navigation}) {
  const handleLogin = token => {
    AsyncStorage.setItem('token', token);
    AsyncStorage.getItem('token').then(stockedToken => {
      if (stockedToken) {
        navigation.navigate('Characters');
      }
    });
  };

  return (
    <CenteredView>
      <Logo width={100} height={40} centered={true} />
      <Spacing size={32} />
      <Title>{title}</Title>
      <Spacing size={8} />
      <LoginForm onSuccessSubmit={handleLogin} />
    </CenteredView>
  );
}

const CenteredView = styled.View`
  margin: auto;
`;

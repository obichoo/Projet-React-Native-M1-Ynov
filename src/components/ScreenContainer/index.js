import AsyncStorage from '@react-native-async-storage/async-storage';
import {getAuth, signOut} from 'firebase/auth';
import React from 'react';
import {View} from 'react-native';
import styled from 'styled-components';
import firebase from '../../config/firebase';
import {getCurrentUser} from '../../services/notesService';
import Button from '../Button';
import Title from '../Title';

export default function ScreenContainer({route, navigation, children, title}) {
  const handleDisconnect = async () => {
    try {
      const auth = getAuth(firebase);
      AsyncStorage.removeItem('token').then(async () => {
        await signOut(auth);
        navigation.navigate('Login');
      });
    } catch (error) {
      console.error(error);
    }
  };

  AsyncStorage.getItem('token').then(storedToken => {
    if (!storedToken || !getCurrentUser()) {
      navigation.navigate('Login');
    }
  });

  return (
    <Container>
      <Header>
        {(title && <Title>{title}</Title>) || <View />}
        {route.name !== 'Login' && (
          <AlignRight>
            <Button
              title={'Déconnexion'}
              bgColor={'#F00'}
              onPress={handleDisconnect}
            />
          </AlignRight>
        )}
      </Header>
      {children}
    </Container>
  );
}

const Container = styled.SafeAreaView`
  padding: 20px;
`;

const Header = styled.View`
  display: flex;
  width: 100%;
  flex-direction: row;
  margin-bottom: 20px;
  justify-content: space-between;
  align-items: center;
`;

const AlignRight = styled.View`
  align-self: flex-end;
`;

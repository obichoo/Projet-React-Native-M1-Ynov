import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import styled from 'styled-components';
import {getCurrentUser} from '../../services/notesService';
import Button from '../Button';
import Title from '../Title';
import auth from '@react-native-firebase/auth';
import Toast from 'react-native-toast-message';

const ScreenContainer = ({route, navigation, children, title}) => {
  const [pageReady, setPageReady] = useState(false);
  const [disconnecting, setDisconnecting] = useState(false);
  const handleDisconnect = async () => {
    try {
      setDisconnecting(true);
      AsyncStorage.removeItem('token').then(async () => {
        if (getCurrentUser()) {
          try {
            await auth().signOut();
            Toast.show({
              type: 'success',
              text1: 'Déconnexion réussie',
              text2: 'À bientôt !',
              position: 'bottom',
            });
            setDisconnecting(false);
            navigation.navigate('Login');
          } catch (error) {
            console.error(error);
          }
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    AsyncStorage.getItem('token').then(storedToken => {
      if ((!storedToken || !getCurrentUser()) && route.name !== 'Login') {
        handleDisconnect();
      } else {
        setPageReady(true);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      AsyncStorage.getItem('token').then(storedToken => {
        if ((!storedToken || !getCurrentUser()) && route.name !== 'Login') {
          handleDisconnect();
        } else {
          setPageReady(true);
        }
      });
    });

    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation]);

  if (pageReady === false) {
    return <View />;
  }
  return (
    <Container>
      <Header>
        {(title && <Title>{title}</Title>) || <View />}
        {route.name !== 'Login' && (
          <AlignRight>
            <Button
              title={'Déconnexion'}
              loading={disconnecting}
              bgColor={'#F00'}
              onPress={handleDisconnect}
            />
          </AlignRight>
        )}
      </Header>
      {children}
    </Container>
  );
};

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

export default ScreenContainer;

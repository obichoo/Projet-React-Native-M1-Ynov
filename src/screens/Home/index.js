import React from 'react';
import Title from '../../components/Title';
import Button from '../../components/Button';
import firebase from '../../config/firebase';
import {getAuth, signOut} from 'firebase/auth';

export default function Home({title, navigation}) {
  const handleDisconnect = async () => {
    try {
      const auth = getAuth(firebase);
      await signOut(auth);
      navigation.navigate('Login');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Title>{title}</Title>
      <Button title={'Déconnexion'} bgColor={'#F00'} onPress={handleDisconnect} />
      <Button
        title={'Créer une nouvelle note'}
        bgColor={'#2ecc71'}
        onPress={() => navigation.navigate('CreateNote')}
      />
    </>
  );
}

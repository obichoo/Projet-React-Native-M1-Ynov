import React from 'react';
import Title from '../../components/Title';
import Button from '../../components/Button';

export default function Home({title, navigation}) {
  return (
    <>
      <Title>{title}</Title>
      <Button
        title={'Vers Login'}
        onPress={() => navigation.navigate('Login')}
      />
    </>
  );
}

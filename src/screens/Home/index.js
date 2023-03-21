import React, {useEffect} from 'react';
import Button from '../../components/Button';
import {getCurrentUserNotes} from '../../services/notesService';

export default function Home({navigation}) {
  const getNotes = async () => {
    const notes = await getCurrentUserNotes();
    console.log(notes);
  };

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <>
      <Button
        title={'Créer une nouvelle note'}
        bgColor={'#2ecc71'}
        width={200}
        onPress={() => navigation.navigate('CreateNote')}
      />
    </>
  );
}

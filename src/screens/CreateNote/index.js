import React, {useState} from 'react';
import Button from '../../components/Button';
import {createNote} from '../../services/notesService';
import Input from '../../components/Input';
import Spacing from '../../components/Spacing';
import BackButton from '../../components/BackButton';
import ErrorText from '../../components/ErrorText';
import CheckboxInput from '../../components/Checkbox';

const CreateNote = ({navigation}) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isPinned, setIsPinned] = useState(false);
  const [password, setPassword] = useState(null);
  const [remind, setRemind] = useState(false);
  const [error, setError] = useState('');

  const handleSaveNote = async () => {
    if (!title) {
      setError('Le titre est obligatoire');
      return;
    }

    if (!content) {
      setError('Le contenu est obligatoire');
      return;
    }

    await createNote(title, content, isPinned, password, remind);
    navigation.navigate('Home');
    return true;
  };

  return (
    <>
      <BackButton>Revenir à la liste des notes</BackButton>
      <Spacing size={16} />
      <Input width="100%" name="Titre" value={title} onChange={setTitle} />
      <Spacing size={8} />
      <Input
        width="100%"
        name="Contenu"
        value={content}
        onChange={setContent}
        multiline={true}
      />
      <Spacing size={8} />
      <Input
        width="100%"
        type="password"
        name="Protéger avec un mot de passe"
        value={password}
        onChange={setPassword}
      />
      <Spacing size={8} />
      <CheckboxInput
        label="Epingler la note"
        checked={isPinned}
        onChange={() => setIsPinned(!isPinned)}
      />
      <Spacing size={8} />
      <CheckboxInput
        label="Me rappeller cette note à la fermeture de l'application"
        checked={remind}
        onChange={() => setRemind(!remind)}
      />
      <Spacing size={4} />
      {error !== '' && <ErrorText width={150}>{error}</ErrorText>}
      <Spacing size={8} />
      <Button title="Créer la note" onPress={handleSaveNote} />
    </>
  );
};

export default CreateNote;

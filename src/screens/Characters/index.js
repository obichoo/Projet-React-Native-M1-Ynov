import React, {useCallback, useEffect, useState} from 'react';
import Title from '../../components/Title';
import Button from '../../components/Button';
import CharacterCard from '../../components/CharacterCard';
import styled from 'styled-components';
import Spacing from '../../components/Spacing';
import MarvelService from '../../services/MarvelService';

export default function Characters({title, navigation}) {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    getCharacters();
  }, [getCharacters, offset]);

  const getCharacters = useCallback(() => {
    setLoading(true);
    MarvelService.getAllCharacters(offset)
      .then(res => {
        setLoading(false);
        setCharacters([...characters, ...res.data.data.results]);
      })
      .catch(err => {
        setLoading(false);
        console.log(err);
      });
  }, [characters, offset]);

  const listFooter = () => {
    if (!loading) return null;
    return <StyledActivityIndicator size="large" color="#000000" />;
  };

  return (
    <>
      <Title>{title}</Title>
      <Button title={'Vers Home'} onPress={() => navigation.navigate('Home')} />
      {characters.length > 0 && (
        <StyledCharactersList
          data={characters}
          numColumns="3"
          renderItem={({item}) => (
            <CharacterCard
              onPress={() =>
                navigation.navigate('CharacterDetails', {characterId: item.id})
              }
              character={item}
            />
          )}
          keyExtractor={item => item.id}
          onEndReached={() => setOffset(offset + 20)}
          ItemSeparatorComponent={() => <Spacing />}
          ListFooterComponent={listFooter}
        />
      )}
      {loading && <StyledActivityIndicator size="large" color="#000000" />}
    </>
  );
}

const StyledCharactersList = styled.FlatList`
  margin-top: 20px;
  margin-bottom: 100px;
`;

const StyledActivityIndicator = styled.ActivityIndicator`
  margin-top: 0px;
`;

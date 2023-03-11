import React, {useCallback, useEffect, useState} from 'react';
import {ActivityIndicator} from 'react-native';
import styled from 'styled-components/native';
import Button from '../../components/Button';
import Title from '../../components/Title';
import MarvelService from '../../services/MarvelService';

export default function CharacterDetails({title, navigation, route}) {
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCharacter();
  }, []);

  const getCharacter = useCallback(() => {
    const characterId = route.params.characterId;
    MarvelService.getOneCharacter(characterId)
      .then(res => {
        setCharacter(res.data.data.results[0]);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }, [route.params.characterId]);

  if (loading) {
    return (
      <LoaderContainer>
        <ActivityIndicator size="large" color="#0000ff" />
      </LoaderContainer>
    );
  }

  return (
    <>
      <Title>{title}</Title>
      <Button
        width={120}
        title={'Vers Characters'}
        onPress={() => navigation.navigate('Characters')}
      />
      <Container>
        <CharacterImage
          source={{
            uri: `${character.thumbnail?.path.replace('http', 'https')}.${
              character.thumbnail?.extension
            }`,
          }}
        />
        <Name>{character.name}</Name>
        <DetailsContainer>
          {character.description && (
            <Detail>
              <Label>Description :</Label>
              <Item>{character.description}</Item>
            </Detail> ?? 'Pas de description'
          )}
          {character.comics?.items?.length > 0 && (
            <Detail>
              <Label>Comics :</Label>
              {character.comics?.items?.map(comic => (
                <Item key={comic.name}>{comic.name}</Item>
              ))}
            </Detail>
          )}
          {character.series?.items?.length > 0 && (
            <Detail>
              <Label>Séries :</Label>
              {character.series?.items?.map(serie => (
                <Item key={serie.name}>{serie.name}</Item>
              ))}
            </Detail>
          )}
          {character.events?.items?.length > 0 && (
            <Detail>
              <Label>Événements :</Label>
              {character.events?.items?.map(event => (
                <Item key={event.name}>{event.name}</Item>
              ))}
            </Detail>
          )}
        </DetailsContainer>
      </Container>
    </>
  );
}

const LoaderContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const Container = styled.ScrollView`
  padding: 16px;
  margin-top: 10px;
  margin-bottom: 60px;
`;

const CharacterImage = styled.Image`
  width: 100%;
  height: 300px;
  resizemode: cover;
  margin-bottom: 16px;
`;

const Name = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 8px;
`;

const DetailsContainer = styled.View`
  margin-top: 16px;
  margin-bottom: 16px;
`;

const Detail = styled.View`
  margin-bottom: 8px;
`;

const Label = styled.Text`
  font-weight: bold;
  margin-bottom: 4px;
`;

const Item = styled.Text`
  margin-bottom: 2px;
`;

import React from 'react';
import styled from 'styled-components';

export default function CharacterCard({character, onPress = () => {}}) {
  return (
    <StyledCharacterCard onPress={onPress}>
      <StyledImage
        source={{
          uri: `${character.thumbnail?.path.replace('http', 'https')}.${
            character.thumbnail?.extension
          }`,
        }}
      />
      <StyledText>{character.name}</StyledText>
    </StyledCharacterCard>
  );
}

const StyledCharacterCard = styled.TouchableOpacity`
  margin-left: auto;
  margin-right: auto;
`;
const StyledImage = styled.Image`
  width: 110px;
  height: 100px;
  margin-bottom: 0;
`;
const StyledText = styled.Text`
  font-size: 16px;
  margin: auto;
  text-align: center;
  width: 110px;
`;

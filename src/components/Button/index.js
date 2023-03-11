import React from 'react';
import styled from 'styled-components';

export default function Button({
  bgColor = 'black',
  title = 'Bouton',
  onPress,
  width = 100,
  height = 30,
  color = '#fff',
}) {
  return (
    <StyledButton
      bgColor={bgColor}
      width={width}
      height={height}
      onPress={() => (onPress ? onPress() : () => {})}>
      <StyledText color={color}>{title}</StyledText>
    </StyledButton>
  );
}

const StyledButton = styled.TouchableOpacity`
  background-color: ${props => props.bgColor};
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
`;

const StyledText = styled.Text`
  color: ${props => props.color};
`;

import React from 'react';
import styled from 'styled-components';

const CustomButton = ({
  bgColor = 'black',
  title = 'Bouton',
  onPress,
  width = 100,
  height = 30,
  color = '#fff',
  alignText = 'center',
}) => {
  return (
    <StyledButton
      bgColor={bgColor}
      width={width}
      height={height}
      onPress={() => (onPress ? onPress() : () => {})}>
      <StyledText alignText={alignText} color={color}>
        {title}
      </StyledText>
    </StyledButton>
  );
};

const StyledButton = styled.TouchableOpacity`
  background-color: ${props => props.bgColor};
  width: ${props =>
    typeof props.width == 'number' ? props.width + 'px' : props.width};
  height: ${props => props.height}px;
  justify-content: center;
  border-radius: 4px;
`;

const StyledText = styled.Text`
  text-align: ${props => props.alignText};
  color: ${props => props.color};
`;

export default CustomButton;

import React from 'react';
import {ActivityIndicator} from 'react-native';
import styled from 'styled-components';

const CustomButton = ({
  bgColor = 'black',
  title = 'Bouton',
  onPress,
  width = 100,
  height = 30,
  color = '#fff',
  alignText = 'center',
  loading = false,
}) => {
  return (
    <StyledButton
      bgColor={bgColor}
      width={width}
      height={height}
      loading={loading}
      onPress={() => (onPress && !loading ? onPress() : () => {})}>
      {loading ? (
        <ActivityIndicator color={color} />
      ) : (
        <StyledText alignText={alignText} color={color}>
          {title}
        </StyledText>
      )}
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
  opacity: ${props => (props.loading ? 0.5 : 1)};
`;

const StyledText = styled.Text`
  text-align: ${props => props.alignText};
  color: ${props => props.color};
`;

export default CustomButton;

import React from 'react';
import styled from 'styled-components';

const Logo = ({size = 30, centered = false}) => {
  return (
    <StyledLogo centered={centered}>
      <StyledImage size={size} source={require('./.././../assets/logo.png')} />
      <StyledText>MyNotes</StyledText>
    </StyledLogo>
  );
};

const StyledLogo = styled.View`
  margin: ${props => (props.centered ? 'auto' : '0')};
  flex-direction: row;
  align-items: center;
`;

const StyledImage = styled.Image`
  width: ${props => props.size}px;
  height: ${props => props.size}px;
`;

const StyledText = styled.Text`
  font-size: 30px;
  font-weight: bold;
  color: black;
  margin-left: 10px;
`;

export default Logo;

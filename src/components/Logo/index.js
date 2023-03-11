import React from 'react';
import styled from 'styled-components';

export default function Logo({width = 100, height = 100, centered = false}) {
  return (
    <StyledLogo centered={centered} width={width} height={height}>
      <StyledImage
        source={{
          uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Marvel_Logo.svg/2560px-Marvel_Logo.svg.png',
        }}
      />
    </StyledLogo>
  );
}

const StyledLogo = styled.View`
  margin: ${props => (props.centered ? 'auto' : '0')};
  width: ${props => props.width}px;
  height: ${props => props.height}px;
`;

const StyledImage = styled.Image`
  width: 100%;
  height: 100%;
`;

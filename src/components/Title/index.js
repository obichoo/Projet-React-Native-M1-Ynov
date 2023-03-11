import React from 'react';
import styled from 'styled-components';

export default function Title({size, color, children}) {
  return (
    <StyledText size={size} color={color}>
      {children}
    </StyledText>
  );
}

const StyledText = styled.Text`
  font-size: ${props => props.size || 24}px;
  color: ${props => props.color || 'black'};
  font-weight: ${props => props.weight || 'bold'};
`;

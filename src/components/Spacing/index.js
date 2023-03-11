import React from 'react';
import styled from 'styled-components';

export default function Spacing({size = 16}) {
  return <StyledView size={size} />;
}

const StyledView = styled.View`
  height: ${props => props.size}px;
`;

import React from 'react';
import styled from 'styled-components';

const Spacing = ({size = 16}) => {
  return <StyledView size={size} />;
};

const StyledView = styled.View`
  height: ${props => props.size}px;
`;

export default Spacing;

import React from 'react';
import styled from 'styled-components';

export default function ErrorText({children}) {
  return <StyledText>{children}</StyledText>;
}

const StyledText = styled.Text`
  color: red;
  font-size: 12px;
`;

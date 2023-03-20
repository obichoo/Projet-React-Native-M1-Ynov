import React from 'react';
import styled from 'styled-components';

export default function ErrorText({children, width}) {
  return <StyledText width={width}>{children}</StyledText>;
}

const StyledText = styled.Text`
  color: red;
  width: ${props => `${props.width}px` || '100%'};
  font-size: 12px;
`;

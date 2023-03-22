import React from 'react';
import styled from 'styled-components';

const ErrorText = ({children, width = '100%', textAlign = 'left'}) => {
  return (
    <StyledText textAlign={textAlign} width={width}>
      {children}
    </StyledText>
  );
};

const StyledText = styled.Text`
  color: red;
  text-align: ${props => props.textAlign};
  width: ${props =>
    `${typeof props.width === 'number' ? `${props.width}px` : props.width}`};
  font-size: 12px;
`;

export default ErrorText;

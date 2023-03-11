import React from 'react';
import styled from 'styled-components';

export default function Input({
  type = 'text',
  name = 'Champs',
  onChange = () => {},
}) {
  const handleChange = (event = {}) => onChange(event);

  return (
    <StyledView>
      <StyledText>{name}</StyledText>
      <StyledInput
        type={type}
        name={name}
        onChangeText={e => handleChange(e)}
      />
    </StyledView>
  );
}

const StyledView = styled.View`
  width: 150px;
`;
const StyledInput = styled.TextInput`
  width: 100%;
  height: 30px;
  padding: 6px;
  border: 1px solid black;
  border-radius: 4px;
  color: black;
`;
const StyledText = styled.Text`
  width: 100%;
  color: black;
`;

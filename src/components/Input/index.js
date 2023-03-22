import React, {useState} from 'react';
import styled from 'styled-components';

const Input = ({
  type = 'text',
  name = 'Champs',
  multiline = false,
  width = '150px',
  onChange = () => {},
  value = '',
  maxLength = 45,
  mandatory = false,
}) => {
  const handleChange = (event = {}) => onChange(event);
  const [height, setHeight] = useState(30);

  return (
    <StyledView width={width}>
      <StyledText>
        {name}
        {mandatory && <Mandatory>*</Mandatory>}
      </StyledText>
      <StyledInput
        name={name}
        value={value}
        multiline={multiline}
        onChangeText={e => handleChange(e)}
        onContentSizeChange={event =>
          setHeight(event.nativeEvent.contentSize.height)
        }
        maxLength={multiline ? 9999999 : maxLength}
        height={height}
        secureTextEntry={type === 'password'}
      />
    </StyledView>
  );
};

const StyledView = styled.View`
  width: ${props => props.width};
`;
const StyledInput = styled.TextInput`
  width: 100%;
  height: ${props =>
    props.multiline ? `${Math.max(35, props.height)}px` : '40px'};
  padding: 6px;
  border: 1px solid black;
  border-radius: 4px;
  color: black;
`;
const StyledText = styled.Text`
  width: 100%;
  color: black;
`;
const Mandatory = styled.Text`
  color: red;
`;

export default Input;

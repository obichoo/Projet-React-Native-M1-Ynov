import React from 'react';
import styled from 'styled-components';

const CheckboxInput = ({label, checked, onChange}) => {
  return (
    <CheckboxContainer onPress={onChange}>
      <Checkbox checked={checked}>
        {checked && <Checkmark>&#10004;</Checkmark>}
      </Checkbox>
      <CheckboxLabel>{label}</CheckboxLabel>
    </CheckboxContainer>
  );
};

const CheckboxContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

const Checkbox = styled.View`
  width: 24px;
  height: 24px;
  border-radius: 12px;
  border-width: 1px;
  border-color: #000;
  margin-right: 8px;
`;

const CheckboxLabel = styled.Text`
  font-size: 16px;
  color: #333;
`;

const Checkmark = styled.Text`
  font-size: 22px;
  color: #000;
  text-align: center;
  line-height: 24px;
`;

export default CheckboxInput;

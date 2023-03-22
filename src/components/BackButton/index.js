import React from 'react';
import {useNavigation} from '@react-navigation/native';
import styled from 'styled-components';

const BackButton = ({children, onPress, width}) => {
  const navigation = useNavigation();

  return (
    <StyledBackButton
      width={width}
      onPress={onPress ? onPress() : () => navigation.goBack()}>
      <StyledBackButtonText>← {children}</StyledBackButtonText>
    </StyledBackButton>
  );
};

const StyledBackButton = styled.TouchableOpacity`
  width: 100%;
  border: 1px solid #000;
  border-radius: 5px;
  padding: 5px;
  width: ${props => props.width || '180px'};
  background-color: #000;
`;

const StyledBackButtonText = styled.Text`
  color: #fff;
  display: flex;
  justify-content: center;
  font-size: 12px;
  font-weight: 500;
`;

export default BackButton;

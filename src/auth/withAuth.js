import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Login from './src/screens/Login';
import styled from 'styled-components/native';

const withAuth = WrappedComponent => {
  const AuthenticatedComponent = props => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
      checkAuth();
    }, []);

    const checkAuth = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        setIsAuthenticated(true);
      }
    };

    {
      isAuthenticated ? (
        <Container>
          <WrappedComponent {...props} />
        </Container>
      ) : (
        <Login />
      );
    }
  };

  return AuthenticatedComponent;
};

const Container = styled.SafeAreaView`
  padding: 20px;
`;

export default withAuth;

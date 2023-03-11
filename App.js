import React from 'react';
import Home from './src/screens/Home';
import Login from './src/screens/Login';
import Characters from './src/screens/Characters';
import {ThemeProvider} from 'styled-components';
import theme from './src/config/theme';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import styled from 'styled-components';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen options={globalScreenOptions} name="Login">
            {props => (
              <Container>
                <Login {...props} title={'Connexion'} />
              </Container>
            )}
          </Stack.Screen>
          <Stack.Screen options={globalScreenOptions} name="Home">
            {props => (
              <Container>
                <Home {...props} title={'Home'} />
              </Container>
            )}
          </Stack.Screen>
          <Stack.Screen options={globalScreenOptions} name="Characters">
            {props => (
              <Container>
                <Characters {...props} title={'Characters'} />
              </Container>
            )}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}

const Stack = createNativeStackNavigator();
const globalScreenOptions = {
  headerShown: false,
};

const Container = styled.SafeAreaView`
  padding: 20px;
`;

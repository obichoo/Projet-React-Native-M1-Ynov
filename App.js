import React from 'react';
import Home from './src/screens/Home';
import Login from './src/screens/Login';
import {ThemeProvider} from 'styled-components';
import theme from './src/config/theme';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import styled from 'styled-components';
import CreateNote from './src/screens/CreateNote';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen options={globalScreenOptions} name="Home">
            {props => (
              <Container>
                <Home {...props} title={'Mes notes'} />
              </Container>
            )}
          </Stack.Screen>
          <Stack.Screen options={globalScreenOptions} name="Login">
            {props => (
              <Container>
                <Login {...props} />
              </Container>
            )}
          </Stack.Screen>
          <Stack.Screen options={globalScreenOptions} name="CreateNote">
            {props => (
              <Container>
                <CreateNote {...props} />
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

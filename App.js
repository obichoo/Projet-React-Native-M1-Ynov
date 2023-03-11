import React, {useState} from 'react';
import Home from './src/screens/Home';
import Login from './src/screens/Login';
import {ThemeProvider} from 'styled-components';
import theme from './src/config/theme';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import styled from 'styled-components';

export default function App() {
  const [user, setUser] = useState(null);

  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen options={globalScreenOptions} name="Login">
            {props => (
              <Container>
                <Login {...props} />
              </Container>
            )}
          </Stack.Screen>
          <Stack.Screen options={globalScreenOptions} name="Home">
            {props => (
              <Container>
                <Home {...props} title={'Mes notes'} />
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

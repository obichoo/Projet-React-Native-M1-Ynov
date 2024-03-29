import React from 'react';
import Home from './src/screens/Home';
import Login from './src/screens/Login';
import {ThemeProvider} from 'styled-components';
import theme from './src/config/theme';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CreateNote from './src/screens/CreateNote';
import EditNote from './src/screens/EditNote';
import ScreenContainer from './src/components/ScreenContainer';
import Toast from 'react-native-toast-message';
import Reviews from './src/screens/Reviews';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen options={globalScreenOptions} name="Home">
            {props => (
              <ScreenContainer title={'Mes notes'} {...props}>
                <Home {...props} />
              </ScreenContainer>
            )}
          </Stack.Screen>
          <Stack.Screen options={globalScreenOptions} name="Login">
            {props => (
              <ScreenContainer {...props}>
                <Login {...props} />
              </ScreenContainer>
            )}
          </Stack.Screen>
          <Stack.Screen options={globalScreenOptions} name="CreateNote">
            {props => (
              <ScreenContainer title={'Créer une note'} {...props}>
                <CreateNote {...props} />
              </ScreenContainer>
            )}
          </Stack.Screen>
          <Stack.Screen options={globalScreenOptions} name="EditNote">
            {props => (
              <ScreenContainer title={'Modifier une note'} {...props}>
                <EditNote {...props} />
              </ScreenContainer>
            )}
          </Stack.Screen>
          <Stack.Screen options={globalScreenOptions} name="Reviews">
            {props => (
              <ScreenContainer title={"Avis sur l'application"} {...props}>
                <Reviews {...props} />
              </ScreenContainer>
            )}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>

      <Toast />
    </ThemeProvider>
  );
};

const Stack = createNativeStackNavigator();
const globalScreenOptions = {
  headerShown: false,
};

export default App;

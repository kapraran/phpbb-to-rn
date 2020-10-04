/**
 * @format
 */

import 'react-native-gesture-handler';
import React from 'react';
import { AppRegistry } from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import {Provider as ReduxProvider} from 'react-redux'
import { name as appName } from './app.json';
import { NavigationContainer } from '@react-navigation/native';
import Stack from './src/navigator';

import Home from './src/screens/Home';
import Login from './src/screens/Login';
import ViewForum from './src/screens/ViewForum';
import ViewTopic from './src/screens/ViewTopic';
import Reply from './src/screens/Reply';
import { store } from './src/store/store';

const theme = {
  ...DefaultTheme,
  dark: true,
  roundness: 4,
  colors: {
    ...DefaultTheme.colors,
    primary: 'darkgreen',
  },
};

export default function Main() {
  return (
    <ReduxProvider store={store}>
      <NavigationContainer>
        <PaperProvider theme={theme}>
          <Stack.Navigator headerMode="none">
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="ViewForum" component={ViewForum} />
            <Stack.Screen name="ViewTopic" component={ViewTopic} />
            <Stack.Screen name="Reply" component={Reply} />
          </Stack.Navigator>
        </PaperProvider>
      </NavigationContainer>
    </ReduxProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);

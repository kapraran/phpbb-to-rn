/**
 * @format
 */

import 'react-native-gesture-handler';
import React from 'react';
import { AppRegistry } from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { name as appName } from './app.json';
import { NavigationContainer } from '@react-navigation/native';
import Stack from './src/navigator';

import Home from './src/screens/Home';
import Login from './src/screens/Login';
import ViewForum from './src/screens/ViewForum';
import ViewTopic from './src/screens/ViewTopic';
import Reply from './src/screens/Reply';

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
  );
}

AppRegistry.registerComponent(appName, () => Main);

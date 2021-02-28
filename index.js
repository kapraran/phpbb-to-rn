import 'react-native-gesture-handler';
import React from 'react';
import { AppRegistry } from 'react-native';
import { Colors, Provider as PaperProvider } from 'react-native-paper';
import { Provider as ReduxProvider, connect } from 'react-redux';
import { name as appName } from './app.json';
import {
  DefaultTheme as DefaultNavTheme,
  NavigationContainer,
} from '@react-navigation/native';
import Stack from './src/navigator';
import { PanathaDarkTheme, PanathaLightTheme } from './src/themes';
import { store, persistor } from './src/store/store';
import { PersistGate } from 'redux-persist/integration/react';

import Home from './src/screens/Home';
import Login from './src/screens/Login';
import ViewForum from './src/screens/ViewForum';
import ViewTopic from './src/screens/ViewTopic';
import Reply from './src/screens/Reply';
import Settings from './src/screens/Settings';

const appTheme = PanathaDarkTheme;

const ThemedContainer = ({ darkMode }) => {
  const navTheme = DefaultNavTheme;
  navTheme.colors.background = darkMode ? Colors.black : Colors.white;

  return (
    <NavigationContainer theme={navTheme}>
      <PaperProvider theme={darkMode ? PanathaDarkTheme : PanathaLightTheme}>
        <Stack.Navigator headerMode="none">
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="ViewForum" component={ViewForum} />
          <Stack.Screen name="ViewTopic" component={ViewTopic} />
          <Stack.Screen name="Reply" component={Reply} />
          <Stack.Screen name="Settings" component={Settings} />
        </Stack.Navigator>
      </PaperProvider>
    </NavigationContainer>
  );
};

const mapStateToProps = (state) => ({
  darkMode: state.settings.darkMode,
});

const ConnectedThemedContainer = connect(mapStateToProps)(ThemedContainer);

// export default function Main() {
const Main = () => (
  <ReduxProvider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ConnectedThemedContainer></ConnectedThemedContainer>
    </PersistGate>
  </ReduxProvider>
);

AppRegistry.registerComponent(appName, () => Main);

import { Colors, DarkTheme, DefaultTheme } from 'react-native-paper';

export const PanathaDarkTheme = {
  ...DarkTheme,
  dark: true,
  roundness: 4,
  colors: {
    ...DarkTheme.colors,
    primary: 'darkgreen',
    background: Colors.black,
  },
};

export const PanathaLightTheme = {
  ...DefaultTheme,
  dark: false,
  roundness: 4,
  colors: {
    ...DefaultTheme.colors,
    primary: 'darkgreen',
  },
};

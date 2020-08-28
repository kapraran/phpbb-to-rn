import { createStackNavigator } from '@react-navigation/stack';

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
};

const stackNavigator = createStackNavigator<RootStackParamList>();

export default stackNavigator;

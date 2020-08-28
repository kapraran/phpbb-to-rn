import { createStackNavigator } from '@react-navigation/stack';

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  ViewForum: { title: string; groupName: string };
};

const stackNavigator = createStackNavigator<RootStackParamList>();

export default stackNavigator;

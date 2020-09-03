import { createStackNavigator } from '@react-navigation/stack';
import { ForumLinkParams } from './api/scrapers/home';

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  ViewForum: { title: string; groupName: string; params: ForumLinkParams };
};

const stackNavigator = createStackNavigator<RootStackParamList>();

export default stackNavigator;

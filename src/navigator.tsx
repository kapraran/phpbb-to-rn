import { createStackNavigator } from '@react-navigation/stack';
import { ForumLinkParams } from './api/scrapers/home';
import { TopicLinkParams } from './api/scrapers/viewforum';

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  ViewForum: { title: string; groupName: string; params: ForumLinkParams };
  ViewTopic: { title: string; forumName: string; params: TopicLinkParams };
  Reply: {};
};

const stackNavigator = createStackNavigator<RootStackParamList>();

export default stackNavigator;

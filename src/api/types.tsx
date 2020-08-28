export interface TopicLinkParams {
  f: number;
  t: number;
}

export interface TopicItem {
  title: string;
  author: string;
  replies: number;
  unread: boolean;
  linkParams: TopicLinkParams;
}

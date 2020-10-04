import { dbg, prependBaseUrl } from '../../utils/utils';
import { URL } from 'react-native-url-polyfill';

export interface TopicLinkParams {
  f: number;
  t: number;
  start?: number;
}

export interface TopicLinkData {
  author: string;
  title: string;
  replies: number;
  unread: boolean;
  params: TopicLinkParams;
}

export enum TopicRowType {
  HEAD,
  OPTIONS,
  GROUP,
  TOPIC,
}

const resolveRowType = (row: HTMLTableRowElement): TopicRowType => {
  const firstChild = row.children[0];

  if (firstChild.tagName === 'TH') {
    return TopicRowType.HEAD;
  } else if (row.children.length === 1) {
    return firstChild.className === 'cat'
      ? TopicRowType.OPTIONS
      : TopicRowType.GROUP;
  }

  return TopicRowType.TOPIC;
};

const getRowAuthor = (row: HTMLTableRowElement): string => {
  return row.querySelector('p.topicauthor')!.textContent || '';
};

const getRowLinkQuery = (row: HTMLTableRowElement) => {
  const td = row.children[1];
  const a = td.querySelector<HTMLAnchorElement>('a')!;
  const params = new URL(prependBaseUrl(a!.href)).searchParams;

  const f = parseInt(params.get('f')!);
  const t = parseInt(params.get('t')!);
  const unread = params.get('view') == 'unread';

  return {
    f,
    t,
    unread,
  };
};

const getRowTitle = (row: HTMLTableRowElement): string => {
  return row.querySelector('.topictitle')!.innerHTML;
};

const getRowReplies = (row: HTMLTableRowElement): number => {
  return parseInt(row.querySelector('.topicdetails')!.innerHTML);
};

export const viewForumScraper = (document: Document) => {
  const tableEl = document.querySelector('#pagecontent table.tablebg')!;
  const rows = tableEl.querySelectorAll('tr');

  const befLoop = Date.now();
  const topics = Array.from(rows).reduce<TopicLinkData[]>((topics, row) => {
    const start = Date.now();
    dbg(':::RS', start);
    const rowType = resolveRowType(row);
    dbg(':::RE', start);

    if (rowType != TopicRowType.TOPIC) return topics;

    dbg(':::0', start);
    const author = getRowAuthor(row);
    dbg(':::1', start);
    const title = getRowTitle(row);
    dbg(':::2', start);
    const replies = getRowReplies(row);
    const { f, t, unread } = getRowLinkQuery(row);
    dbg(':::4', start);

    topics.push({
      author,
      title,
      replies,
      unread,
      params: { f, t },
    });

    return topics;
  }, []);
  dbg('After loop', befLoop);

  return topics;
};

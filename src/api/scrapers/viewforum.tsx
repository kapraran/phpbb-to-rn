import { parseRelativeURL } from '../../utils/utils';

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
  const params = parseRelativeURL(a.getAttribute('href')!).searchParams;

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

  const topics = Array.from(rows).reduce<TopicLinkData[]>((topics, row) => {
    const rowType = resolveRowType(row);

    if (rowType != TopicRowType.TOPIC) return topics;

    const author = getRowAuthor(row);
    const title = getRowTitle(row);
    const replies = getRowReplies(row);
    const { f, t, unread } = getRowLinkQuery(row);

    topics.push({
      author,
      title,
      replies,
      unread,
      params: { f, t },
    });

    return topics;
  }, []);

  return topics;
};

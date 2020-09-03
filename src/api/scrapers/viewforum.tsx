export interface TopicLinkData {
  author: string;
  title: string;
  replies: number;
  unread: boolean;
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

const isRowUnread = (row: HTMLTableRowElement): boolean => {
  const td = row.children[1];
  const a = td.children[0];

  if (a.tagName !== 'A') return false;

  return a.href.indexOf('&view=unread') > -1;
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
    const unread = isRowUnread(row);

    topics.push({
      author,
      title,
      replies,
      unread,
    });

    return topics;
  }, []);

  return topics;
};

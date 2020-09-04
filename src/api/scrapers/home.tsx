import { URL } from 'react-native-url-polyfill';
import he from 'he';
import { prependBaseUrl } from '../../utils/utils';

export interface GroupItem {
  name: string;
  forums: ForumItem[];
}

export interface ForumItem {
  title: string;
  description: string;
  linkParams: ForumLinkParams;
}

export interface ForumLinkParams {
  f: number;
  start?: number;
}

const getParams = function (row: Element): ForumLinkParams {
  const a = row.querySelector<HTMLAnchorElement>('.forumlink')!;
  const params = new URL(prependBaseUrl(a!.href)).searchParams;

  return { f: parseInt(params.get('f')!) };
};

export const homeScraper = (document: Document): GroupItem[] => {
  const wrapper = document.querySelector('#contentrow');
  const groups: GroupItem[] = [];

  if (wrapper === null) return groups;

  return Array.from(wrapper.children).reduce<GroupItem[]>((groups, el) => {
    const { className, children } = el;

    switch (className) {
      case 'cap-div':
        if (groups.length >= 5) return groups;

        groups.push({
          name: el.querySelector('h4 a')!.innerHTML,
          forums: [],
        });
        break;

      case 'tablebg':
        if (el.querySelector('.forumlink') === null) return groups;

        const forums = Array.from(el.querySelectorAll('tr')).slice(1);
        const forumItems = forums
          .filter((forumEl, i) => forumEl.children.length >= 2 && i % 2 == 0)
          .map<ForumItem>((forumEl) => {
            const linkParams = getParams(forumEl);
            const title = forumEl.querySelector('.forumlink')!.innerHTML;
            const description = forumEl.querySelector('.forumdesc')!.innerHTML;

            return {
              title: he.decode(title),
              description,
              linkParams,
            };
          });

        groups[groups.length - 1].forums = forumItems;
        break;
    }

    return groups;
  }, groups);
};

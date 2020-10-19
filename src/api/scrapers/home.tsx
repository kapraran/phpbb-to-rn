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
  hasUnread: boolean;
  linkParams: ForumLinkParams;
}

export interface ForumLinkParams {
  f: number;
  start?: number;
}

const getParams = function (link: HTMLAnchorElement): ForumLinkParams {
  const params = new URL(prependBaseUrl(link.getAttribute('href')!))
    .searchParams;

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
            const link = forumEl.querySelector<HTMLAnchorElement>('.forumlink');

            const linkParams = getParams(link!);
            const title = link!.innerHTML;
            const description = forumEl.querySelector('.forumdesc')!.innerHTML;
            const hasUnread = link?.classList.contains('link-new');

            return {
              title: he.decode(title),
              description,
              linkParams,
              hasUnread,
            };
          });

        groups[groups.length - 1].forums = forumItems;
        break;
    }

    return groups;
  }, groups);
};

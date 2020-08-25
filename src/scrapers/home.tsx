interface GroupItem {
  name: string;
  forums: ForumItem[];
}

interface ForumItem {
  title: string;
  description: string;
  linkParams: ForumLink;
}

interface ForumLink {
  f: number;
}

const getParams = function (row: Element): ForumLink {
  const a = row.querySelector<HTMLAnchorElement>('.forumlink')!;
  const params = new URL(a!.href).searchParams;

  return { f: parseInt(params.get('f')!) };
};

const homeScraper = (document: Document) => {
  const wrapper = document.querySelector('#contentrow');
  const groups: GroupItem[] = [];

  if (wrapper === null) return { groups };

  Array.from(wrapper.children).reduce<GroupItem[]>((groups, el) => {
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

        const forums = Array.from(el.children[0].children).slice(1);
        const forumItems = Array.from(forums)
          .filter((forumEl) => forumEl.children.length >= 2)
          .map<ForumItem>((forumEl) => {
            const linkParams = getParams(forumEl);

            return {
              title: forumEl.querySelector('.forumlink')!.innerHTML,
              description: forumEl.querySelector('.forumdesc')!.innerHTML,
              linkParams,
            };
          });

        groups[groups.length - 1].forums = forumItems;
    }

    return groups;
  }, groups);
};

export default homeScraper;

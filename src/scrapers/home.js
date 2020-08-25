const homeScraper = (document) => {
  // const groups = [];
  // const wrapper = document.querySelector('#contentrow');
  // wrapper.children.forEach((el) => {
  //   const cname = el.className;
  //   if (cname === 'cap-div') {
  //     if (groups.length >= 5) return;
  //     groups.push({
  //       name: el.querySelector('h4 a').textContent,
  //       forums: [],
  //     });
  //   } else if (cname === 'tablebg') {
  //     if (el.querySelector('.forumlink') === null) return;
  //     const forums = Array.from(el.children[0].children).slice(1);
  //   }
  // });
  // $els = document.querySelector('#contentrow');
  // [].forEach.call($els.children, ($el) => {
  //   if ($el.className === 'cap-div') {
  //     if (groups.length >= 5) return;
  //     groups.push({
  //       name: $el.querySelector('h4 a').innerHTML,
  //       forums: [],
  //     });
  //     return;
  //   }
  //   if ($el.className === 'tablebg') {
  //     if ($el.querySelector('.forumlink') === null) return;
  //     let $forums = Array.from($el.children[0].children).slice(1);
  //     [].forEach.call($forums, ($forum) => {
  //       if ($forum.children.length < 2) return;
  //       let params = getParams($forum);
  //       let forum = {
  //         title: $forum.querySelector('.forumlink').innerHTML,
  //         description: $forum.querySelector('.forumdesc').innerHTML,
  //         params,
  //       };
  //       groups[groups.length - 1].forums.push(forum);
  //     });
  //   }
  // });
  // return Object.assign({groups}, basics(routeData));
};

export default homeScraper;

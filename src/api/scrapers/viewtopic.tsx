import hasClass from 'dom-helpers/hasClass';

export interface PostUserData {
  username: string;
  avatarUrl: string | null;
}

export interface PostData {
  content: string;
  date: Date;
  signature: string | null;
  hasUnreadAnchor: boolean;
  user: PostUserData;
}

export const viewTopicScraper = (document: Document) => {
  const rows = document.querySelectorAll('#pagecontent .tablebg tr');

  return Array.from(rows).reduce<PostData[]>((posts, row) => {
    // check if row contains post data
    if (row === undefined || (!hasClass(row, 'row1') && !hasClass(row, 'row2')))
      return posts;

    // check if post bottom
    if (row.querySelector('.postbottom') !== null) {
      // add date to previous post
      const dateStr = row.children[0].innerHTML;
      posts[posts.length - 1].date = new Date(dateStr);

      return posts;
    }

    // post body
    const bodyNodes = row.querySelectorAll('.postbody');
    const content = bodyNodes[0].innerHTML;
    const signature = bodyNodes[1] ? bodyNodes[1].innerHTML : null;
    const hasUnreadAnchor = row.querySelector('a[name="unread"]') !== null;

    // user details
    const avatarEl = row.querySelector<HTMLImageElement>('.postavatar img');
    const username = row.querySelector<HTMLDivElement>('.postauthor')!
      .textContent!;
    const avatarUrl = avatarEl ? avatarEl.src : null;

    posts.push({
      content,
      date: new Date(), // temporary
      signature,
      hasUnreadAnchor,
      user: {
        username,
        avatarUrl,
      },
    });

    return posts;
  }, []);
};

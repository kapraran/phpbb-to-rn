export interface CommonData {
  isLogged: boolean;
  username: string | null;
}

export const commonScraper = (document: Document): CommonData => {
  // check if user is authenticated
  const headerLinks: HTMLAnchorElement[]= Array.from(document.querySelectorAll(
    'td.navrow a',
  ));
  const loginLink = headerLinks.find(link => link.getAttribute('href')!.startsWith('./ucp.php?mode=login'))

  const isLogged = !loginLink;
  const username = null;

  return { isLogged, username };
};

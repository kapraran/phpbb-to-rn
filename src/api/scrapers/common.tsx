export interface CommonData {
  isLogged: boolean;
  username: string | null;
}

export const commonScraper = (document: Document): CommonData => {
  // check if user is authenticated
  const loginLink = document.querySelectorAll(
    'td.navrow a',
  )[1] as HTMLAnchorElement;
  const isLogged = loginLink.getAttribute('href') != './ucp.php?mode=login';

  const username = null;

  return { isLogged, username };
};

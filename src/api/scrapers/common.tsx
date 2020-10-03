export interface CommonData {
  isLogged: boolean;
}

export const commonScraper = (document: Document): CommonData => {
  // check if user is authenticated
  const loginLink = document.querySelectorAll(
    'td.navrow a',
  )[1] as HTMLAnchorElement;
  const isLogged = loginLink.href != './ucp.php?mode=login';

  return { isLogged };
};

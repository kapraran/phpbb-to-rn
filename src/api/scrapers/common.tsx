export interface CommonData {
  isLogged: boolean;
}

export const commonScraper = (document: Document): CommonData => {
  // check if user is authenticated
  const loginLink = document.querySelector(
    'td.navrow a[href="./ucp.php?mode=login"]',
  );
  const isLogged = loginLink === null;

  return { isLogged };
};

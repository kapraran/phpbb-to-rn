import jsdom from 'jsdom-jscore-rn';
import { homeScraper } from './scrapers/home';

export const parseHTML = (html: string): Promise<Window> => {
  return new Promise((resolve, reject) => {
    jsdom.env(html, (error: Error, window: Window) => {
      if (error) reject(error);
      resolve(window);
    });
  });
};

export const login = async (username: string, password: string) => {
  const data: { [key: string]: string } = {
    username,
    password,
    autologin: 'on',
    login: 'login',
  };

  const formBody = Object.keys(data)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join('&');

  const response = await fetch('http://panathagrforum.net/ucp.php?mode=login', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Host: 'panathagrforum.net',
      'User-Agent': 'insomnia/2020.3.3',
    },
    redirect: 'follow',
    body: formBody,
  });

  console.log(response.headers);

  return await response.text();
};

export const getIndexForums = async () => {
  const resp = await fetch('http://panathagrforum.net/', {
    credentials: 'include',
  });
  const window = await parseHTML(await resp.text());

  return homeScraper(window.document);
};

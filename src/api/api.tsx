import axios from 'axios';
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

export const getIndexForums = async () => {
  const resp = await axios.get('http://panathagrforum.net/');
  const window = await parseHTML(resp.data);

  return homeScraper(window.document);
};

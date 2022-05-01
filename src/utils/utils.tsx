import jsdom from 'jsdom-jscore-rn';
import { URL } from 'react-native-url-polyfill';

const BASE_URL = 'http://panathagrforum.net';

/**
 * Great tool! Especially since react-native profiling tool sucks
 *
 * @param msg
 * @param startTime
 */
export const dbg = (msg: string, startTime: number) =>
  console.log(`${msg} [${((Date.now() - startTime) / 1000).toFixed(2)}]`);

export const prependBaseUrlIfNeeded = (uri: string) => {
  if (uri.charAt(0) === '/') return createURL(uri);
  return uri;
};

/**
 *
 * @param path
 * @param query
 * @returns
 */
export const createURL = (path: string, query?: object) => {
  const queryStr = Object.entries(query || {})
    .filter(([_, v]) => !!v)
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join('&');

  return `${BASE_URL}/${path.replace(/^\/+/g, '')}${
    queryStr ? `?${queryStr}` : ''
  }`;
};

export const parseRelativeURL = (relUrl: string) => new URL(createURL(relUrl));

/**
 *
 * @param str
 * @returns
 */
export const firstLetterUpper = (str: string) =>
  str
    .split(' ')
    .map(
      (word) =>
        `${word.charAt(0).toUpperCase()}${word.substring(1).toLowerCase()}`,
    )
    .join(' ');

/**
 *
 * @param html
 * @returns
 */
export const parseHTML = (html: string): Promise<Window> => {
  return new Promise((resolve, reject) => {
    jsdom.env(html, (error: Error, window: Window) => {
      if (error) return reject(error);
      resolve(window);
    });
  });
};

import jsdom from 'jsdom-jscore-rn';

export const prependBaseUrl = (suffix: string) => {
  const slash = suffix.charAt(0) === '/' ? '' : '/';
  return `http://panathagrforum.net${slash}${suffix}`;
};

export const firstLetterUpper = (str: string) => {
  return str
    .split(' ')
    .map(
      (part) => part.charAt(0).toUpperCase() + part.substring(1).toLowerCase(),
    )
    .join(' ');
};

export const parseHTML = (html: string): Promise<Window> => {
  return new Promise((resolve, reject) => {
    jsdom.env(html, (error: Error, window: Window) => {
      if (error) reject(error);
      resolve(window);
    });
  });
};

import jsdom from 'jsdom-jscore-rn';

/**
 * Great tool! Especially since react-native profiling tool sucks
 *
 * @param msg
 * @param startTime
 */
export const dbg = (msg: string, startTime: number) =>
  console.log(`${msg} [${((Date.now() - startTime) / 1000).toFixed(2)}]`);

export const prependBaseUrl = (suffix: string) => {
  const slash = suffix.charAt(0) === '/' ? '' : '/';
  return `http://panathagrforum.net${slash}${suffix}`;
};

export const prependBaseUrlIfNeeded = (uri: string) => {
  if (uri.charAt(0) === '/') return prependBaseUrl(uri);
  return uri;
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

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

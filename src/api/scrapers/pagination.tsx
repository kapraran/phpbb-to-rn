export interface PaginationData {
  current: number;
  max: number;
}

export const paginationScraper = (document: Document): PaginationData => {
  let current = 1;
  let max = 1;
  const table = document.querySelector('#pagecontent table');

  if (table === null) return { current, max };

  const tds = table.querySelectorAll('td');
  const b = tds[tds.length - 1].querySelector('b');

  if (b === null) return { current, max };

  return Array.from(b.children).reduce<PaginationData>(
    (pagination, el) => {
      if (el.tagName === 'STRONG') {
        current = parseInt(el.innerHTML);
        max = current > max ? current : max;
      } else if (el.tagName === 'A') {
        const n = +el.innerHTML;
        if (!isNaN(n) && n > max) max = n;
      }

      return { current, max };
    },
    { current, max },
  );
};

import { homeScraper, ForumLinkParams } from './scrapers/home';
import { commonScraper } from './scrapers/common';
import { viewForumScraper, TopicLinkParams } from './scrapers/viewforum';
import { prependBaseUrl, parseHTML } from '../utils/utils';
import { viewTopicScraper } from './scrapers/viewtopic';
import { paginationScraper } from './scrapers/pagination';
import { replyScraper, ReplyInputField } from './scrapers/reply';

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

  const window = await parseHTML(await response.text());

  return commonScraper(window.document).isLogged;
};

export const getIndexForums = async () => {
  const response = await fetch('http://panathagrforum.net/', {
    credentials: 'include',
  });
  const window = await parseHTML(await response.text());
  const document = window.document;

  const common = commonScraper(document);
  const groupItems = homeScraper(document);

  return {
    ...common,
    groupItems,
  };
};

export const getViewForumTopics = async (params: ForumLinkParams) => {
  const now = Date.now();
  console.log(`started fetch ${((Date.now() - now) / 1000).toFixed(2)}s`);
  const response = await fetch(
    `http://panathagrforum.net/viewforum.php?f=${params.f}&start=${
      params.start || 0
    }`,
    {
      credentials: 'include',
    },
  );

  console.log(`ended fetch ${((Date.now() - now) / 1000).toFixed(2)}s`);

  const window = await parseHTML(await response.text());
  const document = window.document;

  console.log(`ended parse ${((Date.now() - now) / 1000).toFixed(2)}s`);

  const common = commonScraper(document);
  console.log(`ended scrapers1 ${((Date.now() - now) / 1000).toFixed(2)}s`);

  const topics = viewForumScraper(document);
  console.log(`ended scrapers2 ${((Date.now() - now) / 1000).toFixed(2)}s`);

  const pagination = paginationScraper(document);
  console.log(`ended scrapers3 ${((Date.now() - now) / 1000).toFixed(2)}s`);

  return {
    ...common,
    pagination,
    topics,
  };
};

export const getViewTopicPosts = async (params: TopicLinkParams) => {
  const { f, t, start } = params;
  const unread = start === undefined;
  const pageStr = unread ? '&view=unread' : `&start=${start || 0}`;

  const response = await fetch(
    prependBaseUrl(`viewtopic.php?f=${f}&t=${t}${pageStr}`),
    {
      credentials: 'include',
    },
  );

  const window = await parseHTML(await response.text());
  const document = window.document;

  const common = commonScraper(document);
  const posts = viewTopicScraper(document);
  const pagination = paginationScraper(document);

  return {
    ...common,
    pagination,
    posts,
  };
};

export const getReplyFields = async (params: TopicLinkParams) => {
  const { f, t } = params;

  const response = await fetch(
    prependBaseUrl(`posting.php?mode=reply&f=${f}&t=${t}`),
    {
      credentials: 'include',
    },
  );

  const window = await parseHTML(await response.text());
  const document = window.document;

  const common = commonScraper(document);
  const reply = replyScraper(document);

  return {
    ...common,
    reply,
  };
};

export const postReply = async (
  params: TopicLinkParams,
  fields: ReplyInputField[],
) => {
  const { f, t } = params;
  const formData = fields.reduce<FormData>((formData, field) => {
    formData.append(field.name, field.value);
    return formData;
  }, new FormData());

  const response = await fetch(
    prependBaseUrl(`posting.php?mode=reply&f=${f}&t=${t}`),
    {
      method: 'POST',
      credentials: 'include',
      body: formData,
    },
  );
};

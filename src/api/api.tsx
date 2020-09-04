import jsdom from 'jsdom-jscore-rn';
import { homeScraper, ForumLinkParams } from './scrapers/home';
import { commonScraper } from './scrapers/common';
import { viewForumScraper, TopicLinkParams } from './scrapers/viewforum';
import { prependBaseUrl } from '../utils/utils';
import { viewTopicScraper } from './scrapers/viewtopic';

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
  const response = await fetch(
    `http://panathagrforum.net/viewforum.php?f=${params.f}`,
    {
      credentials: 'include',
    },
  );

  const window = await parseHTML(await response.text());
  const document = window.document;

  const common = commonScraper(document);
  const topics = viewForumScraper(document);

  return {
    ...common,
    topics,
  };
};

export const getViewTopicPosts = async (
  params: TopicLinkParams,
  unread: boolean = false,
) => {
  const { f, t, start } = params;
  const pageStr = unread
    ? '&view=unread'
    : start !== undefined
    ? `&start=${start}`
    : '';

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

  return {
    ...common,
    posts,
  };
};

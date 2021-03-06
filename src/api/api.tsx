import { homeScraper, ForumLinkParams } from './scrapers/home';
import { commonScraper } from './scrapers/common';
import { viewForumScraper, TopicLinkParams } from './scrapers/viewforum';
import { prependBaseUrl, parseHTML } from '../utils/utils';
import { viewTopicScraper } from './scrapers/viewtopic';
import { paginationScraper } from './scrapers/pagination';
import { replyScraper, ReplyInputField } from './scrapers/reply';

const fetchDocument = async (
  uri: RequestInfo,
  options: RequestInit | undefined = undefined,
) => {
  options = {
    ...options,
    credentials: 'include',
  };

  const response = await fetch(uri, options);
  const window = await parseHTML(await response.text());

  return window.document;
};

export const login = async (username: string, password: string) => {
  // form data
  const data: { [key: string]: string } = {
    username,
    password,
    autologin: 'on',
    login: 'login',
  };

  // convert to url encoded form
  const formBody = Object.keys(data)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join('&');

  // fetch document
  const document = await fetchDocument(prependBaseUrl('ucp.php?mode=login'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Host: 'panathagrforum.net',
      'User-Agent': 'insomnia/2020.3.3',
    },
    body: formBody,
    redirect: 'follow',
  });

  // scrape document
  return commonScraper(document).isLogged;
};

/**
 * Returns a list of all available forums in groups
 */
export const getIndexForums = async () => {
  const document = await fetchDocument('http://panathagrforum.net/');

  const common = commonScraper(document);
  const groupItems = homeScraper(document);

  return {
    ...common,
    groupItems,
  };
};

/**
 * Returns a list of topic for a certain forum
 *
 * @param params
 */
export const getViewForumTopics = async (params: ForumLinkParams) => {
  const { f, start } = params;
  const document = await fetchDocument(
    prependBaseUrl(`viewforum.php?f=${f}&start=${start || 0}`),
  );

  // scrape document
  const common = commonScraper(document);
  const topics = viewForumScraper(document);
  const pagination = paginationScraper(document);

  return {
    ...common,
    pagination,
    topics,
  };
};

/**
 *
 * @param params
 */
export const getViewTopicPosts = async (params: TopicLinkParams) => {
  const { f, t, start } = params;
  const unread = start === undefined;
  const pageStr = unread ? '&view=unread' : `&start=${start || 0}`;

  const document = await fetchDocument(
    prependBaseUrl(`viewtopic.php?f=${f}&t=${t}${pageStr}`),
  );

  const common = commonScraper(document);
  const posts = viewTopicScraper(document);
  const pagination = paginationScraper(document);

  return {
    ...common,
    pagination,
    posts,
  };
};

/**
 *
 * @param params
 */
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

/**
 *
 * @param params
 * @param fields
 */
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

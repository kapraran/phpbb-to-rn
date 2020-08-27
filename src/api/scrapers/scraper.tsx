import cheerio from 'cheerio';

export type CheerioStatic = ReturnType<typeof cheerio.load>;

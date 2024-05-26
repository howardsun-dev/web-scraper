import express from 'express';
import axios from 'axios';
import cheerio from 'cheerio';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 3000;

export interface Article {
  title: string;
  url: string;
}

const URL = 'https://www.theguardian.com/us';

axios(URL)
  .then(response => {
    const html = response.data;
    const $ = cheerio.load(html); // This loads the HTML and returns a Cheerio object
    const articles: Article[] = [];

    $('[class^="dcr-"]').each(function () {
      const title = $(this).text();
      const url = $(this).find('a').attr('href');
      articles.push({ title, url: url || '' });
    });

    console.log(articles);
  })
  .catch(err => console.log(err));

app.listen(PORT, () => {
  console.log(`[server] Server listening at http://localhost:${PORT}`);
});

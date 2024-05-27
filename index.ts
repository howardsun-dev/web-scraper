import express from 'express';
import axios from 'axios';
import cheerio from 'cheerio';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 3000;

const URL = 'https://www.theguardian.com/us';

axios(URL)
  .then(response => {
    const html = response.data;
    const $ = cheerio.load(html); // This loads the HTML and returns a Cheerio object
    const articles: { title: string; url: string }[] = [];

    $('[class^="dcr-"]').each(function () {
      const title = $(this).text();
      const url = $(this).find('a').attr('href');
      articles.push({ title, url: url || '' });
    });

    console.log(articles);
    fs.writeFile('articles.json', JSON.stringify(articles), err => {
      if (err) throw err;
      console.log('Articles saved to articles.json');
    });
  })
  .catch(err => console.log(err));

app.listen(PORT, () => {
  console.log(`[server] Server listening at http://localhost:${PORT}`);
});

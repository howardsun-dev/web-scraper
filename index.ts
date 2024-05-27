import express from 'express';
import axios from 'axios';
import cheerio from 'cheerio';
import puppeteer from 'puppeteer';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 3000;

const URL = 'https://www.theguardian.com/us';

async function startPuppeteer() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  try {
    await page.goto(URL, { waitUntil: 'networkidle2' }); // Wait until the network is idle

    // Ensure the directory exists
    const dir = './scrapedData';
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Take a screenshot of the path to the specified path
    const screenshotPath = path.resolve(dir, 'screenshot.png');
    await page.screenshot({ path: screenshotPath, fullPage: true });
    console.log('Took a screenshot of the webpage');
  } catch (error) {
    console.error('Error during Puppeteer operation:', error);
  } finally {
    await browser.close();
  }
}
async function scrapeAndSaveArticles() {
  try {
    const html = await axios.get(URL);
    const $ = cheerio.load(html.data); // This loads the HTML and returns a Cheerio object
    const articles: { title: string; url: string }[] = [];

    $('[class^="dcr-"]').each(function () {
      const title = $(this).text();
      const url = $(this).find('a').attr('href');
      articles.push({ title, url: url || '' });
    });

    // Ensure the directory exists
    const dir = './scrapedData';
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Save articles to a file
    fs.writeFile(
      path.resolve(dir, 'articles.json'),
      JSON.stringify(articles),
      err => {
        if (err) throw err;
        console.log('Articles saved to articles.json');
      },
    );
  } catch (err) {
    console.error('Error during scraping:', err);
  }
}

// Axios Promise chain
// axios(URL)
//   .then(response => {
//     const html = response.data;
//     const $ = cheerio.load(html); // This loads the HTML and returns a Cheerio object
//     const articles: { title: string; url: string }[] = [];

//     $('[class^="dcr-"]').each(function () {
//       const title = $(this).text();
//       const url = $(this).find('a').attr('href');
//       articles.push({ title, url: url || '' });
//     });

//     // console.log(articles);
//     fs.writeFile('articles.json', JSON.stringify(articles), err => {
//       if (err) throw err;
//       console.log('Articles saved to articles.json');
//     });
//   })
//   .catch(err => console.log(err));
async function main() {
  await scrapeAndSaveArticles();
  await startPuppeteer();
}

main();

app.listen(PORT, () => {
  console.log(`[server] Server listening at http://localhost:${PORT}`);
});

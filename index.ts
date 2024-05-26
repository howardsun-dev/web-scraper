import express, { Express, Request, Response, NextFunction } from 'express';
import axios from 'axios';
import cheerio from 'cheerio';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`[server] Server listening at http://localhost:${PORT}`);
});

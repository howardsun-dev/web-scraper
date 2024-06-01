# Web Scraper Project

## Overview
This project is a web scraping application designed to extract from websites. It utilizes modern technologies such as Express for server-side operations, Axios for HTTP requests, and Cheerio for parsing HTML content. Puppeteer to grab screenshots also webscrape using headless browser. The primary goal is to demonstrate efficient web scraping techniques while adhering to best practices for maintainable and scalable code.

## Features
- Extracts article titles and URLs from The Guardian's US homepage.
- Utilizes Axios for asynchronous HTTP requests to fetch webpage content.
- Parses HTML content using Cheerio to find and extract relevant data.
- Serves extracted data through a simple Express server.
- Supports environment variables for easy configuration.

## Getting Started

### Prerequisites
- Node.js installed on your machine.
- Basic understanding of JavaScript and the Node.js ecosystem.

### Installation
1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/web-scraper.git
    cd web-scraper
    ```
2. Install dependencies:
    ```sh
    npm install
    ```
3. Set up environment variables (optional).

### Running the Application
Start the server:
```sh
npm start
```
Visit [http://localhost:3000](http://localhost:3000) in your browser to see the scraped articles.
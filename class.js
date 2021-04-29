const puppy = require('puppeteer');
const cheerio = require('cheerio');
const CronJob = require('cron').CronJob;
const nodemailer = require('nodemailer');

const url =
  'https://www.amazon.in/AmazonBasics-139cm-inch-Ultra-Smart/dp/B087JYRGDG/';
const expectedPrices = 41000;

function delay(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
}

function yo() {
  setTimeout(() => {
    console.log('hey');
  }, 1000);
}

async function main() {
  try {
    let browser = await puppy.launch({
      headless: false,
      defaultViewport: false,
      args: ['--start-maximized'],
    });

    let page = await browser.newPage();
    await page.goto(url);
    await delay(10000);
    await page.waitForSelector('#add-to-cart-button', { visible: true });
    await page.click('#add-to-cart-button');

    await page.reload();

    let html = await page.evaluate(() => document.body.innerHTML);
    const $ = cheerio.load(html);
    let priceEl = $('#priceblock_ourprice').text();
    priceEl = priceEl.slice(1);
    priceEl = priceEl.replace(',', ' ');
    await page.waitForSelector('#add-to-cart-button', { visible: true }); // return Promise
    await page.click('#add-to-cart-button', { clickCount: 1 });
    await delay(5000);
    if (priceEl < 40000) {
      await whatsapp();
    }
  } catch (err) {
    console.log(err);
  }
}

async function whatsapp() {
  try {
    let page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);
    await page.goto('https://web.whatsapp.com/');
    await page.waitForTimeout(10000);
    await page.waitForSelector('._2_1wd.copyable-text.selectable-text', {
      visible: true,
    });
    await page.type('._2_1wd.copyable-text.selectable-text', 'manpreet');
    await page.keyboard.press('Enter');
    await page.waitForSelector('._1JAUF._2x4bz .OTBsx', { visible: true });
    let newMessage = 'Price dropped.Buy now soon';
    await page.type(newMessage);
    await page.keyboard.press('Enter');
  } catch (error) {
    console.log(error);
  }
}
main();

const puppy = require('puppeteer');
const cheerio = require('cheerio');
const CronJob = require('cron').CronJob;
const nodemailer = require('nodemailer');

const url = 'https://www.amazon.in/AmazonBasics-139cm-inch-Ultra-Smart/dp/B087JYRGDG/';
const expectedPrices = 41000;
     
async function main(){
let browser = await puppy.launch({
    headless: false,
    defaultViewport: false,
    args: ["--start-maximized"]
});

let page= await browser.newPage();
await page.goto(url);
await page.waitForSelector("#add-to-cart-button", {visible: true});
await page.click("#add-to-cart-button")
//await browser.close()
//return page;
//}

//async function pricechecker(page) {
    await page.reload();
    
    let html = await page.evaluate(()=>document.body.innerHTML);
    const $=cheerio.load(html);
    //console.log(html);
    //$('#priceblock_ourprice',html).each(function(){
       // let cprice = $(this).text();
        //console.log(rupeesPrice);
        //let currentPrice = Number(rupeesPrice.replace((/\B(?=(\d{3})+(?!\d))/g, ",")));

        //const price = parseFloat(currentPrice);
    
    let priceEl = $("#priceblock_ourprice").text();
    priceEl = priceEl.slice(1);
    priceEl = priceEl.replace(","," ");
    await tab.waitForSelector("#add-to-cart-button", {visible: true});
    await tab.click('add-to-cart-button' , { clickCount:1})
    await page.waitFor(5000)
    if(priceEl<40000){
         whatsapp();
    }

}
/*

async function startTracking(){
    const page = await main();
    let job = new CronJob('* * /30 * * * *',function(){  //works for every 30 mins
        priceChecker(page);
    }, null,true,null,null,true);
    job.start();   
}

async function sendMail(price){
    //let testAccount = await nodemailer.createTestAccount();
    const user = "theodore.botsford@ethereal.email";
    const pass="CunA9TqsH8bCNAUnRn";
    let transporter = nodemailer.createTransport({
        host: "smtp@gmail.com",
        port: 587,
        secure: false,
        service: 'gmail', // true for 465, false for other ports
        auth: {
          user, // generated ethereal user
          pass // generated ethereal password
        }
      });
     // send mail with defined transport object
      let info = await transporter.sendMail({
        from: '"Krishvi" <${user}>', // sender address
        to: "srivastavakrishvi@gmail.com", // list of receivers
        subject: "Price dropped!", // Subject line
        text: "Price dropped of ${url} , buy it soon", // plain text body
        // html: "<b>Hello world?</b>", // html body
      });
      console.log("Mail Sent");  
    }
    main().catch(console.error);
    */

    
    async function whatsapp(){
        let  page=await browser.newPage();
        await page.setDefaultNavigationTimeout(0);
        await page.goto("https://web.whatsapp.com/",);
        await page.waitForTimeout(10000);
        await page.waitForSelector("._2_1wd.copyable-text.selectable-text",{visible:true});
        await page.type("._2_1wd.copyable-text.selectable-text","manpreet");
        await page.keyboard.press("Enter");
        await page.waitForSelector("._1JAUF._2x4bz .OTBsx",{visible:true});
        let newMessage="Price dropped.Buy now soon";
        await page.type(newMessage);
        await page.keyboard.press("Enter");
        //await newpage.close();
      }

      main();
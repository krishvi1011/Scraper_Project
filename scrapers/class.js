const puppy = require('puppeteer');
const $ = require('cheerio');
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
return page;
}

async function pricechecker(page) {
    await page.reload();
    let html = await page.evaluate(()=>document.body.innerHTML);
    //console.log(html);
    $('#priceblock_ourprice',html).each(function(){
        let rupeesPrice = $(this).text();
        //console.log(rupeesPrice);
        let currentPrice = Number(rupeesPrice.replace((/\B(?=(\d{3})+(?!\d))/g, ",")));

        const price = parseFloat(currentPrice);
    });



    
    if(price<expectedPrice){
        
         await sendMail(price);
    }

}

async function startTracking(){
    const page = await main();
    let job = new CronJob('** /30 * * * *',function(){
        priceChecker(page);
    }, null,true,null,null,true);
    job.start();   
}
async function sendMail(price){
    //let testAccount = await nodemailer.createTestAccount();
    const user = "srivastavakrishvi@gmail.com";
    const pass="cadqglsqksyhvgzk";
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
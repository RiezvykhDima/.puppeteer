const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
        headless: true,
    });

    try{
        const page = await browser.newPage();
        
        await page.setViewport({ width: 1280, height: 800 });
        await page.goto('https://pptr.dev/', {
            waitUntil: 'networkidle2',
          });
        
        {
            await page.type('input', 'pdf');
            await page.waitForTimeout(2 * 1000);
            await page.keyboard.press('Enter');
            await page.waitForSelector('#parameters');
            await page.addStyleTag({content: '#__docusaurus > div.main-wrapper.docsWrapper_BCFX > div > main > div{background: black'});
            await page.addStyleTag({content: '#__docusaurus > div.main-wrapper.docsWrapper_BCFX > div > main > div > div > div.col.docItemCol_GujU{backgroung: black}'});
            await page.addStyleTag({content: '.navbar__items{background: #950897}'});
            await page.addStyleTag({content: '.menu__link{background: #950897'});
            await page.addStyleTag({content: '#__docusaurus > div.main-wrapper.docsWrapper_BCFX > div > aside > div > nav{background: black'}); 
        }

        {
            await page.pdf({
                path: 'src/screenshots/screenshot.pdf', 
            });
        }

        {
            await page.screenshot({
                path: "src/screenshots/screenshot.png",
                format: 'a4',
            });
        }
    
        await browser.close();
    } catch(error) {
        console.error(error);

        await browser.close();
    } finally {
        await browser.close();
    }
})();
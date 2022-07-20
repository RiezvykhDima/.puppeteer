const puppeteer = require('puppeteer');
const credentials = require('../config/credentials');

(async () => {
    const browser = await puppeteer.launch({
        headless: false
    });

    try{
        const page = await browser.newPage();

        await page.setViewport({ width: 1280, height: 800 });
        await page.goto('https://www.instagram.com/accounts/login/?source=auth_switcher', {
            waitUntil: 'networkidle2',
        })

        await page.waitForSelector("#loginForm > div > div:nth-child(1) > div > label > input");
        await page.type("#loginForm > div > div:nth-child(1) > div > label > input", credentials.user);
        await page.keyboard.down('Tab');
        await page.keyboard.type(credentials.password);
        //I find the Login btn using the innerText comparison because the selector used for the btn might be unstable
        await page.evaluate(() => {
            const btns = [...document.querySelector('.HmktE').querySelectorAll('button')]

            btns.forEach((btn) => {
                if (btn.innerText === 'Log In') { btn.click() }
            })
        })
        await page.waitForSelector('#react-root > section > nav > div._8MQSO.Cx7Bp > div > div > div.ctQZg.KtFt3 > div');
        await page.screenshot({ path: 'src/screenshots/instagram-screenshot22222.png' })

        await browser.close()
    } catch (error) {
        await browser.close();
        throw new Error(error);
    } finally {
        await browser.close();
    }
})();
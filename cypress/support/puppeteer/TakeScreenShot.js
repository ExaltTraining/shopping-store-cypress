const puppeteer = require('puppeteer');

exports.TakeScreenShot = async function TakeScreenShot(userObject) {
    const { root } = userObject;
    return await puppeteer.launch().then(async browser => {
        console.log(userObject);
        try {
            console.log(root);
            const page = await browser.newPage();
            await page.goto(root);
            await page.screenshot({ path: 'storeHomePage.png' });
            await browser.close();

        } catch (error) {
            return null;
        }
        return root;
    })
}
const puppeteer = require("puppeteer");
const fs = require('fs')
const shipxy = {
  "searchBox":'#txtKey'
}
const getScreenShot = async () => {
  const browser = await puppeteer.launch({timeout:60000, headless: true,args: [
    '--disable-extensions-except=/path/to/extension/',
    '--load-extension=/path/to/extension/',
  ] });
  const page = await browser.newPage();
  await page.goto("http://www.shipxy.com/");
  await page.click('.leadpage2 a')
  await page.click('.leadpage3 a')
  await page.type(shipxy.searchBox,'SUNNY')
  await page.click('#searchBtn')
  await page.screenshot({ path: "shipxy.png" });
  let result = await page.evaluate(()=>{
    let result = []
    let list = document.querySelectorAll('#searchResultList li a')
    list.forEach(item=>{
      result.push(item.innerText)
    })
    return result
  })
  fs.writeFileSync('./list.txt',result);
  console.log(result)
  await browser.close();
};
getScreenShot();
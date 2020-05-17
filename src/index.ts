import dotenv from "dotenv";
import puppeteer from "puppeteer";
dotenv.config();

(async () => {
  const browser = await puppeteer.launch({headless: false,defaultViewport:null});
  const page = await browser.newPage();
  await page.goto('https://twitter.com/login');
  await page.type("#react-root > div > div > div.css-1dbjc4n.r-13qz1uu.r-417010 > main > div > div > form > div > div:nth-child(6) > label > div > div.css-1dbjc4n.r-18u37iz.r-16y2uox.r-1wbh5a2.r-1udh08x > div > input", process.env.EMAIL_BOT);
  await page.type("#react-root > div > div > div.css-1dbjc4n.r-13qz1uu.r-417010 > main > div > div > form > div > div:nth-child(7) > label > div > div.css-1dbjc4n.r-18u37iz.r-16y2uox.r-1wbh5a2.r-1udh08x > div > input", process.env.MDP_BOT);
  await page.click("#react-root > div > div > div.css-1dbjc4n.r-13qz1uu.r-417010 > main > div > div > form > div > div:nth-child(8) > div");
  await page.goto('https://twitter.com/explore');
  await page.type('#react-root > div > div > div.css-1dbjc4n.r-18u37iz.r-13qz1uu.r-417010 > main > div > div > div > div > div > div.css-1dbjc4n.r-aqfbo4.r-yfoy6g.r-1ila09b.r-rull8r.r-qklmqi.r-gtdqiz.r-ipm5af.r-1g40b8q > div.css-1dbjc4n.r-136ojw6 > div > div > div > div > div.css-1dbjc4n.r-16y2uox.r-1wbh5a2.r-1pi2tsx.r-1777fci > div.css-1dbjc4n.r-18u37iz.r-16y2uox.r-1wbh5a2.r-5f2r5o.r-zg41ew > div > div > div > form > div.css-1dbjc4n.r-1wbh5a2 > div > div > div.css-901oao.r-jwli3a.r-6koalj.r-16y2uox.r-1qd0xha.r-a023e6.r-16dba41.r-ad9z0x.r-bcqeeo.r-qvutc0 > input', "LREM");
  await page.keyboard.press('Enter');
  await page.goto('https://twitter.com/search?q=LREM&src=typed_query&f=user');
  await page.evaluate(()=>{
    let ctnPerso = document.querySelector("#react-root > div > div > div.css-1dbjc4n.r-18u37iz.r-13qz1uu.r-417010 > main > div > div > div > div > div > div:nth-child(2) > div > div > section > div > div");
    if (ctnPerso) {
      for (const personne of ctnPerso.children) {
        console.log(personne.childNodes);
      }
    }
  })
//  await browser.close();
})();

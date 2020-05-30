import dotenv from "dotenv";
import puppeteer from "puppeteer";

import Interbtn from "./interface/Interbtn"
dotenv.config();

(async () => {
  const browser = await puppeteer.launch({ headless: false, defaultViewport: null });
  const page = await browser.newPage();
  // const client = await page.target().createCDPSession();
  // await client.send('Network.enable');
  // await client.send('Network.setRequestInterception',{
  //   patterns:[
  //     {urlPattern:"*",resourceType:'Script',interceptionStage:'HeaderReceived'}
  //   ]
  // });
  //
  // client.on('Network.requestIntercepted', async({interceptionId,request})=>{
  //   console.log(request.url,interceptionId);
  //   client.send('Network.continueInterceptedRequest',{
  //     interceptionId,
  //   })
  // })
  await page.goto('https://twitter.com/login', { waitUntil: "load" });

  await page.waitFor(1000);
  try {
    await page.type("#react-root > div > div > div.css-1dbjc4n.r-13qz1uu.r-417010 > main > div > div > form > div > div:nth-child(6) > label > div > div.css-1dbjc4n.r-18u37iz.r-16y2uox.r-1wbh5a2.r-1udh08x > div > input", process.env.EMAIL_BOT);
    await page.type("#react-root > div > div > div.css-1dbjc4n.r-13qz1uu.r-417010 > main > div > div > form > div > div:nth-child(7) > label > div > div.css-1dbjc4n.r-18u37iz.r-16y2uox.r-1wbh5a2.r-1udh08x > div > input", process.env.MDP_BOT);
    await page.click("#react-root > div > div > div.css-1dbjc4n.r-13qz1uu.r-417010 > main > div > div > form > div > div:nth-child(8) > div");
  } catch (error) {
    await page.reload();
  }

  await page.goto('https://twitter.com/explore', { waitUntil: "load" });
  await page.waitFor(1000);

  try {
    await page.type('#react-root > div > div > div.css-1dbjc4n.r-18u37iz.r-13qz1uu.r-417010 > main > div > div > div > div > div > div.css-1dbjc4n.r-aqfbo4.r-yfoy6g.r-1ila09b.r-rull8r.r-qklmqi.r-gtdqiz.r-ipm5af.r-1g40b8q > div.css-1dbjc4n.r-136ojw6 > div > div > div > div > div.css-1dbjc4n.r-16y2uox.r-1wbh5a2.r-1pi2tsx.r-1777fci > div.css-1dbjc4n.r-18u37iz.r-16y2uox.r-1wbh5a2.r-5f2r5o.r-zg41ew > div > div > div > form > div.css-1dbjc4n.r-1wbh5a2 > div > div > div.css-901oao.r-jwli3a.r-6koalj.r-16y2uox.r-1qd0xha.r-a023e6.r-16dba41.r-ad9z0x.r-bcqeeo.r-qvutc0 > input', "LREM");
    await page.keyboard.press('Enter');
  } catch (error) {
    await page.reload();
  }

  await page.waitFor(1000);
  await page.goto('https://twitter.com/search?q=LREM&src=typed_query&f=user');
  await page.waitFor(1000);
  let allCibles: string[]= [];
  try {
    allCibles = await page.$$eval("#react-root > div > div > div.css-1dbjc4n.r-18u37iz.r-13qz1uu.r-417010 > main > div > div > div > div > div > div:nth-child(2) > div > div > section > div > div > div > div", (divs) => {
      let tabCibles: string[] = [];
      for (const personne of divs) {
        let cible = personne.childNodes[0];
        cible = cible.lastChild;
        cible = cible.childNodes[0];
        cible = cible.childNodes[1];
        cible = cible.firstChild;
        cible = cible.childNodes[0];
        cible = cible.firstChild;
        cible = cible.href;
        console.log(cible);
        tabCibles.push(cible);
      }
      return tabCibles;
    });
  } catch (error) {
    console.log(error);
  }

  for (const cible of allCibles) {
    try {
      await page.goto(cible, { waitUntil: 'load' });
    } catch (error) {
      console.log(error);
    }

    await page.waitFor("[aria-label='Plus']");
    try {
      await page.click("[aria-label='Plus']");
    } catch (error) {
      await page.reload();
      await page.waitFor("[aria-label='Plus']");
      await page.click("[aria-label='Plus']");
    }
    await page.waitFor("#react-root > div > div > div.r-1d2f490.r-u8s1d.r-zchlnj.r-ipm5af.r-184en5c");
    try {
      let ctnSign:string = "#react-root > div > div > div.r-1d2f490.r-u8s1d.r-zchlnj.r-ipm5af.r-184en5c";
      await page.$eval(ctnSign, (element) => {
        let btnSign = element.childNodes[1];
        btnSign = btnSign.firstChild;
        btnSign = btnSign.childNodes[1];
        btnSign = btnSign.childNodes[2];
        btnSign = btnSign.firstChild;
        btnSign = btnSign.firstChild;
        btnSign = btnSign.firstChild;
        btnSign = btnSign.childNodes[7];
        btnSign.click();
      })
    } catch (error) {
      await page.reload();
      await page.waitFor("[aria-label='Plus']");
      await page.click("[aria-label='Plus']");
      let ctnSign:string = "#react-root > div > div > div.r-1d2f490.r-u8s1d.r-zchlnj.r-ipm5af.r-184en5c";
      await page.$eval(ctnSign, (element:Interbtn) => {
        let btnSign:Interbtn = element.childNodes[1];
        btnSign = btnSign.firstChild;
        btnSign = btnSign.childNodes[1];
        btnSign = btnSign.childNodes[2];
        btnSign = btnSign.firstChild;
        btnSign = btnSign.firstChild;
        btnSign = btnSign.firstChild;
        btnSign = btnSign.childNodes[7];
        btnSign.click();
      })
      console.log(error);
    }

    await page.waitFor("#react-root > div > div > div.r-1d2f490.r-u8s1d.r-zchlnj.r-ipm5af.r-184en5c > div:nth-child(2) > div > div > div > div.css-1dbjc4n.r-1awozwy.r-18u37iz.r-1pi2tsx.r-1777fci.r-1xcajam.r-ipm5af.r-g6jmlv > div.css-1dbjc4n.r-t23y2h.r-1wbh5a2.r-kwpbio.r-rsyp9y.r-1pjcn9w.r-1279nm1.r-htvplk.r-1udh08x");
    try {
      await page.$eval("#react-root > div > div > div.r-1d2f490.r-u8s1d.r-zchlnj.r-ipm5af.r-184en5c > div:nth-child(2) > div > div > div > div.css-1dbjc4n.r-1awozwy.r-18u37iz.r-1pi2tsx.r-1777fci.r-1xcajam.r-ipm5af.r-g6jmlv > div.css-1dbjc4n.r-t23y2h.r-1wbh5a2.r-kwpbio.r-rsyp9y.r-1pjcn9w.r-1279nm1.r-htvplk.r-1udh08x", (element) => {
        let btnAbuse:Interbtn = element;
        btnAbuse = btnAbuse.children[0];
        btnAbuse = btnAbuse.lastChild;
        btnAbuse = btnAbuse.firstChild;
        btnAbuse = btnAbuse.firstChild;
        btnAbuse = btnAbuse.firstChild;
        btnAbuse = btnAbuse.contentWindow;
        if (btnAbuse.document.getElementById("abuse-btn")) {
          // console.log(btnAbuse.document.getElementById("abuse-btn"));
          btnAbuse.document.getElementById("abuse-btn").click();
        } else {
          console.log(btnAbuse.document);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
  //  await browser.close();
})();

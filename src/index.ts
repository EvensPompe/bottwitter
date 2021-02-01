import dotenv from "dotenv";
import puppeteer, { Browser, Page } from "puppeteer";
import Interbtn from "./interface/Interbtn";
import { createConnection, QueryError, RowDataPacket, FieldPacket, Connection } from "mysql2";

dotenv.config();

const connection: Connection = createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_MDP,
  database: process.env.DB_NAME
});

(async () => {
  const browser: Browser = await puppeteer.launch({ headless: false, defaultViewport: null });
  const page: Page = await browser.newPage();

  let i: number = 0,
    nameFake: string[] = [],
    emailFake: string[] = [],
    passFake: string[] = [];
  while (i < 10) {
    await page.goto('https://ethereal.email/login', { waitUntil: "load" });
    await page.waitFor(1000);

    await page.click('body > div.iframe-container > div > form > p > button');
    await page.waitFor(1000);
    const getSomething = async (data: string, array: string[]) => {
      await page.waitFor("body > div.iframe-container > div > div:nth-child(8) > div > table > tbody");
      let path: string = "";
      switch (data) {
        case "name": path = "body > div.iframe-container > div > div:nth-child(8) > div > table > tbody > tr:nth-child(1) > td > code";
          break;
        case "email": path = "body > div.iframe-container > div > div:nth-child(8) > div > table > tbody > tr:nth-child(2) > td > code";
          break;
        case "pass": path = "body > div.iframe-container > div > div:nth-child(8) > div > table > tbody > tr:nth-child(3) > td > code";
          break;
      }
      try {
        let res = await page.$eval(path, (element: Element, array: string[]) => {
          array = [...array, element.innerHTML];
          return array;
        }, array);
        return res;
      } catch (error) {
        await page.reload()
        throw error;
      }
    }
    nameFake = await getSomething("name", nameFake);
    emailFake = await getSomething('email', emailFake);
    passFake = await getSomething('pass', passFake);
    i++;
  }
  let request: string = "INSERT INTO profils (bot_name,bot_email,bot_mdp) VALUES";
  for (let index = 0; index < nameFake.length; index++) {
    if (index !== nameFake.length - 1) {
      request += `("${nameFake[index]}","${emailFake[index]}","${passFake[index]}"),`;
    } else {
      request += `("${nameFake[index]}","${emailFake[index]}","${passFake[index]}");`;
    }
  }

  connection.query(request, (error: QueryError, result: RowDataPacket) => {
    if (error) {
      console.log(error);
    } else {
      console.log(result.info)
    }
  })
  request = "SELECT bot_name,bot_email,bot_mdp FROM profils";
  connection.query(request,(err:QueryError,result:RowDataPacket)=>{
    if(err) throw err;
    console.log(result);
  })
  await page.goto('https://twitter.com/login', { waitUntil: "load" });
  // let isConnected: boolean = false;
  // let ctnLogin: string = "#react-root > div > div > div.css-1dbjc4n.r-13qz1uu.r-417010 > main > div > div > div.css-1dbjc4n.r-13qz1uu > form > div";
  // while (!isConnected) {
  //   await page.waitFor(ctnLogin);
  //   try {
  //     await page.type("#react-root > div > div > div.css-1dbjc4n.r-13qz1uu.r-417010 > main > div > div > div.css-1dbjc4n.r-13qz1uu > form > div > div:nth-child(6) > label > div > div.css-1dbjc4n.r-18u37iz.r-16y2uox.r-1wbh5a2.r-19h5ruw.r-1udh08x.r-1inuy60.r-ou255f.r-m611by > div > input", process.env.EMAIL_BOT)
  //     await page.type("#react-root > div > div > div.css-1dbjc4n.r-13qz1uu.r-417010 > main > div > div > div.css-1dbjc4n.r-13qz1uu > form > div > div:nth-child(7) > label > div > div.css-1dbjc4n.r-18u37iz.r-16y2uox.r-1wbh5a2.r-19h5ruw.r-1udh08x.r-1inuy60.r-ou255f.r-m611by > div > input", process.env.MDP_BOT)
  //     await page.click("#react-root > div > div > div.css-1dbjc4n.r-13qz1uu.r-417010 > main > div > div > div.css-1dbjc4n.r-13qz1uu > form > div > div:nth-child(8) > div > div")
  //     isConnected = true;
  //   } catch (error) {
  //     await page.reload();
  //   }
  // }

  // await page.goto('https://twitter.com/explore', { waitUntil: "load" });
  // await page.waitFor(1000);

  // try {
  //   await page.type('#react-root > div > div > div.css-1dbjc4n.r-18u37iz.r-13qz1uu.r-417010 > main > div > div > div > div > div > div.css-1dbjc4n.r-aqfbo4.r-yfoy6g.r-1ila09b.r-rull8r.r-qklmqi.r-gtdqiz.r-ipm5af.r-1g40b8q > div.css-1dbjc4n.r-136ojw6 > div > div > div > div > div.css-1dbjc4n.r-16y2uox.r-1wbh5a2.r-1pi2tsx.r-1777fci > div.css-1dbjc4n.r-18u37iz.r-16y2uox.r-1wbh5a2.r-5f2r5o.r-zg41ew > div > div > div > form > div.css-1dbjc4n.r-1wbh5a2 > div > div > div.css-901oao.r-jwli3a.r-6koalj.r-16y2uox.r-1qd0xha.r-a023e6.r-16dba41.r-ad9z0x.r-bcqeeo.r-qvutc0 > input', "LREM");
  //   await page.keyboard.press('Enter');
  // } catch (error) {
  //   await page.reload();
  // }

  // await page.waitFor(1000);
  // await page.goto('https://twitter.com/search?q=LREM&src=typed_query&f=user');
  // await page.waitFor(1000);

  // await page.waitFor("#react-root > div > div > div.css-1dbjc4n.r-18u37iz.r-13qz1uu.r-417010 > main > div > div > div > div > div > div:nth-child(2) > div > div > section > div > div");

  // var arrayCibles: string[] = await page.evaluate(() => {
  //   var element = document.querySelector("#react-root > div > div > div.css-1dbjc4n.r-18u37iz.r-13qz1uu.r-417010 > main > div > div > div > div > div > div:nth-child(2) > div > div > section > div > div");
  //   var allCibles: object = new Set([]);
  //   var scrollHeight: number;
  //   var config: object = {
  //     childList: true,
  //     attributes: true,
  //     characterData: true,
  //     subtree: true
  //   };

  //   var observer = new MutationObserver((mutationsList) => {
  //     for (const mutation of mutationsList) {
  //       for (const personne of mutation.target.children) {
  //         let cible = personne.childNodes[0];
  //         cible = cible.lastChild;
  //         cible = cible.childNodes[0];
  //         cible = cible.children[1];
  //         cible = cible.firstChild;
  //         cible = cible.childNodes[0];
  //         cible = cible.firstChild;
  //         cible = cible.href;
  //         allCibles.add(cible);
  //       }
  //     }
  //   });

  //   const resizeObserver = new ResizeObserver((entries: any) => {
  //     for (const entry of entries) {
  //       scrollHeight = entry.contentRect.height;
  //     }
  //   });

  //   resizeObserver.observe(element);
  //   observer.observe(element, config);

  //   var totalHeight: number = 0;
  //   return new Promise((resolve) => {
  //     var distance: number = 100;
  //     const interval = setInterval(() => {
  //       window.scrollBy(0, distance);
  //       totalHeight += distance;
  //       if (totalHeight >= scrollHeight) {
  //         clearInterval(interval);
  //         window.scrollBy(0, -totalHeight);
  //         let resAllCibles: string[] = [];
  //         for (const cibleSet of allCibles.values()) {
  //           resAllCibles.push(cibleSet)
  //         }
  //         resolve(resAllCibles);
  //       }
  //     }, 300);
  //   });
  // });

  // for (const cible of arrayCibles) {
  //   try {
  //     await page.goto(cible, { waitUntil: 'load' });
  //   } catch (error) {
  //     console.log(error);
  //   }

  //   await page.waitFor("[aria-label='Plus']");
  //   try {
  //     await page.click("[aria-label='Plus']");
  //   } catch (error) {
  //     await page.reload();
  //     await page.waitFor("[aria-label='Plus']");
  //     await page.click("[aria-label='Plus']");
  //   }
  //   await page.waitFor("#react-root > div > div > div.r-1d2f490.r-u8s1d.r-zchlnj.r-ipm5af.r-184en5c");
  //   try {
  //     let ctnSign: string = "#react-root > div > div > div.r-1d2f490.r-u8s1d.r-zchlnj.r-ipm5af.r-184en5c";
  //     await page.$eval(ctnSign, (element) => {
  //       let btnSign = element.childNodes[1];
  //       btnSign = btnSign.firstChild;
  //       btnSign = btnSign.childNodes[1];
  //       btnSign = btnSign.childNodes[2];
  //       btnSign = btnSign.firstChild;
  //       btnSign = btnSign.firstChild;
  //       btnSign = btnSign.firstChild;
  //       btnSign = btnSign.childNodes[7];
  //       btnSign.click();
  //     })
  //   } catch (error) {
  //     await page.reload();
  //     await page.waitFor("[aria-label='Plus']");
  //     await page.click("[aria-label='Plus']");
  //     let ctnSign: string = "#react-root > div > div > div.r-1d2f490.r-u8s1d.r-zchlnj.r-ipm5af.r-184en5c";
  //     try {
  //       await page.$eval(ctnSign, (element: Interbtn) => {
  //         let btnSign: Interbtn = element.childNodes[1];
  //         btnSign = btnSign.firstChild;
  //         btnSign = btnSign.childNodes[1];
  //         btnSign = btnSign.childNodes[2];
  //         btnSign = btnSign.firstChild;
  //         btnSign = btnSign.firstChild;
  //         btnSign = btnSign.firstChild;
  //         btnSign = btnSign.childNodes[7];
  //         btnSign.click();
  //       })
  //     } catch (error) {
  //       console.log(error);
  //       await page.click("[aria-label='Plus']");
  //       await page.click("[aria-label='Plus']");
  //       await page.evaluate(() => {
  //         console.log(document);
  //       })
  //     }
  //   }

  //   const clickButton = async (selector) => {
  //     await page.waitFor("#react-root > div > div > div.r-1d2f490.r-u8s1d.r-zchlnj.r-ipm5af.r-184en5c > div:nth-child(2) > div > div > div > div.css-1dbjc4n.r-1awozwy.r-18u37iz.r-1pi2tsx.r-1777fci.r-1xcajam.r-ipm5af.r-g6jmlv > div.css-1dbjc4n.r-t23y2h.r-1wbh5a2.r-kwpbio.r-rsyp9y.r-1pjcn9w.r-1279nm1.r-htvplk.r-1udh08x");
  //     try {
  //       await page.$eval("#react-root > div > div > div.r-1d2f490.r-u8s1d.r-zchlnj.r-ipm5af.r-184en5c > div:nth-child(2) > div > div > div > div.css-1dbjc4n.r-1awozwy.r-18u37iz.r-1pi2tsx.r-1777fci.r-1xcajam.r-ipm5af.r-g6jmlv > div.css-1dbjc4n.r-t23y2h.r-1wbh5a2.r-kwpbio.r-rsyp9y.r-1pjcn9w.r-1279nm1.r-htvplk.r-1udh08x", (element, selector) => {
  //         let btn: Interbtn = element;
  //         btn = btn.children[0];
  //         btn = btn.lastChild;
  //         btn = btn.firstChild;
  //         btn = btn.firstChild;
  //         btn = btn.firstChild;
  //         btn = btn.contentWindow;
  //         if (btn.document.querySelector(selector)) {
  //           btn.document.querySelector(selector).click();
  //         } else {
  //           console.log(btn.document);
  //         }
  //       }, selector);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   await clickButton("#abuse-btn");
  //   await clickButton("#hateful-btn");
  //   await clickButton("#me-btn");
  //   await clickButton("#MultiItemForm > form > div > div.MultiItemSelect-bottom > button.skip-btn");
  //   await clickButton("body > div > div > form > button");
  //   await clickButton("#react-root > div > div > div.r-1d2f490.r-u8s1d.r-zchlnj.r-ipm5af.r-184en5c > div:nth-child(2) > div > div > div > div.css-1dbjc4n.r-1awozwy.r-18u37iz.r-1pi2tsx.r-1777fci.r-1xcajam.r-ipm5af.r-g6jmlv > div.css-1dbjc4n.r-t23y2h.r-1wbh5a2.r-kwpbio.r-rsyp9y.r-1pjcn9w.r-1279nm1.r-htvplk.r-1udh08x > div > div.css-1dbjc4n.r-1h3ijdo.r-136ojw6 > div > div > div > div.css-1dbjc4n.r-obd0qt.r-1pz39u2.r-1777fci.r-1joea0r.r-1vsu8ta.r-18qmn74 > div");

  // }

  //  await browser.close();
})();

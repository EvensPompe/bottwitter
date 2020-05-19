import dotenv from "dotenv";
import puppeteer from "puppeteer";
dotenv.config();

(async () => {
  const browser = await puppeteer.launch({headless: false,defaultViewport:null});
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
  await page.goto('https://twitter.com/login',{waitUntil:"load"});
  await page.evaluate(()=>{
    let alertTwitter:string = "#banners > div.Banner.Banner--aboveNav.eu-cookie-notice > div > div.Banner-actions > button > span";
    if (document.querySelector(alertTwitter)) {
      document.querySelector(alertTwitter).click();
    }
  })
  await page.type("#react-root > div > div > div.css-1dbjc4n.r-13qz1uu.r-417010 > main > div > div > form > div > div:nth-child(6) > label > div > div.css-1dbjc4n.r-18u37iz.r-16y2uox.r-1wbh5a2.r-1udh08x > div > input", process.env.EMAIL_BOT);
  await page.type("#react-root > div > div > div.css-1dbjc4n.r-13qz1uu.r-417010 > main > div > div > form > div > div:nth-child(7) > label > div > div.css-1dbjc4n.r-18u37iz.r-16y2uox.r-1wbh5a2.r-1udh08x > div > input", process.env.MDP_BOT);
  await page.click("#react-root > div > div > div.css-1dbjc4n.r-13qz1uu.r-417010 > main > div > div > form > div > div:nth-child(8) > div");
  await page.goto('https://twitter.com/explore',{waitUntil:"load"});
  await page.type('#react-root > div > div > div.css-1dbjc4n.r-18u37iz.r-13qz1uu.r-417010 > main > div > div > div > div > div > div.css-1dbjc4n.r-aqfbo4.r-yfoy6g.r-1ila09b.r-rull8r.r-qklmqi.r-gtdqiz.r-ipm5af.r-1g40b8q > div.css-1dbjc4n.r-136ojw6 > div > div > div > div > div.css-1dbjc4n.r-16y2uox.r-1wbh5a2.r-1pi2tsx.r-1777fci > div.css-1dbjc4n.r-18u37iz.r-16y2uox.r-1wbh5a2.r-5f2r5o.r-zg41ew > div > div > div > form > div.css-1dbjc4n.r-1wbh5a2 > div > div > div.css-901oao.r-jwli3a.r-6koalj.r-16y2uox.r-1qd0xha.r-a023e6.r-16dba41.r-ad9z0x.r-bcqeeo.r-qvutc0 > input', "LREM");
  await page.keyboard.press('Enter');
  await page.goto('https://twitter.com/search?q=LREM&src=typed_query&f=user');
  let allCibles:string[] = await page.evaluate(()=>{
    let tabCibles:string[] = [];
    let ctnPerso = document.querySelector("#react-root > div > div > div.css-1dbjc4n.r-18u37iz.r-13qz1uu.r-417010 > main > div > div > div > div > div > div:nth-child(2) > div > div > section > div > div");
    if (ctnPerso) {
      for (const personne of ctnPerso.children[0].childNodes) {
        let cible = personne.childNodes[0];
        cible = cible.lastChild;
        cible = cible.childNodes[0];
        cible = cible.childNodes[1];
        cible = cible.firstChild;
        cible = cible.childNodes[0];
        cible = cible.firstChild;
        cible = cible.href;
        tabCibles.push(cible);
      }
    }
    return tabCibles;
  });
  for (const cible of allCibles) {
      await page.goto(cible,{waitUntil:'load'});
  }
//  await browser.close();
})();

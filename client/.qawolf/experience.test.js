const qawolf = require("qawolf");

let browser;
let context;

beforeAll(async () => {
  browser = await qawolf.launch();
  context = await browser.newContext();
  await qawolf.register(context);
});

afterAll(async () => {
  await qawolf.stopVideos();
  await browser.close();
});

test("Add a new experience", async () => {
    const page = await context.newPage();
    await page.goto("https://atecbook.herokuapp.com/", { 
      waitUntil: "domcontentloaded"
    });
    await page.click(".btn-light");
    await page.click('[name="email"]');
    await page.fill('[name="email"]', "test@test.com");
    await page.click('[name="password"]');
    await page.fill('[name="password"]', "testes");
    await page.click(".btn");
    await page.click(".fab");
    await page.click('[name="title"]');
    await page.fill('[name="title"]', "test");
    await page.click('[name="company"]');
    await page.fill('[name="company"]', "testany");
    await page.click('[name="location"]');
    await page.fill('[name="location"]', "Arras");
    await page.click('[name="from"]');
    await page.fill('[name="from"]', "2020-12-28");
    await page.click('[name="to"]');
    await page.click('[name="to"]');
    await page.fill('[name="to"]', "2020-12-28");
    await page.click(".btn");
});
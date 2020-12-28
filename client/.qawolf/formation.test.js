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
    await page.click(".fa-graduation-cap");
    await page.click('[name="school"]');
    await page.fill('[name="school"]', "ecole test");
    await page.click('[name="degree"]');
    await page.fill('[name="degree"]', "Master");
    await page.click('[placeholder="Field Of Study"]');
    await page.fill('[placeholder="Field Of Study"]', "Developpeur");
    await page.click('[name="from"]');
    await page.fill('[name="from"]', "2020-12-28");
    await page.click('[name="to"]');
    await page.fill('[name="to"]', "2020-12-28");
    await page.click('[placeholder="Program Description"]');
    await page.fill('[placeholder="Program Description"]', "developpeur web");
    await page.click(".btn");
    await page.click(".fa-sign-out-alt");
});
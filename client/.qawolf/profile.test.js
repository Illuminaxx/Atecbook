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

test("Make a new profile after connexion", async () => {
    const page = await context.newPage();
    await page.goto('https://atecbook.herokuapp.com/', {
        waitUntil: "domcontentloaded"
    });
    await page.click(".btn-light");
    await page.click('[name="email"]');
    await page.fill('[name="email"]', "test@test.com");
    await page.click('[name="password"]');
    await page.fill('[name="password"]', "testes");
    await page.click(".btn");
    await page.click(".btn.btn-primary.my-1");
    await page.selectOption('[name="status"]', "Frontend");
    await page.click('[name="company"]');
    await page.fill('[name="company"]', "test");
    await page.click('[name="website"]');
    await page.fill('[name="website"]', "noon-test.com");
    await page.click('[name="location"]');
    await page.fill('[name="location"]', "Arras");
    await page.click('[name="skills"]');
    await page.fill('[name="skills"]', "PWA, NodeJS, Vue");
    await page.click('[name="bio"]');
    await page.fill('[name="bio"]', "Hello World !!");
    await page.click(".btn-primary");
});

test("Update profile", async () => {
    const page = await context.newPage();
    await page.goto('https://atecbook.herokuapp.com/', {
        waitUntil: "domcontentloaded"
    });
    await page.click(".btn-light");
    await page.click('[name="email"]');
    await page.fill('[name="email"]', "test@test.com");
    await page.click('[name="password"]');
    await page.fill('[name="password"]', "testes");
    await page.click(".btn");
    await page.click('text="Communauté"');
    await page.click('[href="/profile/5fe46110aba56f001725c7bc"]');
    await page.click('text="Editer le profil"');
    await page.click('[name="location"]');
    await page.fill('[name="location"]', "Lille");
    await page.click('[name="skills"]');
    await page.fill('[name="skills"]', "PWA, Webflow, React");
    await page.click(".btn-primary");
    await page.click("text=Retour");
    await page.click(".fa-sign-out-alt");
});
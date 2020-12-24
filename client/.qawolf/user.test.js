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

test("Register a user", async () => {
  const page = await context.newPage();
  await page.goto("https://atecbook.herokuapp.com/", { 
    waitUntil: "domcontentloaded"
  });
  await page.click(".btn");
  await page.click('[name="name"]');
  await page.fill('[name="name"]', "test");
  await page.click('[name="email"]');
  await page.fill('[name="email"]', "test@test.com");
  await page.click('[name="password"]');
  await page.fill('[name="password"]', "testes");
  await page.click('[placeholder="Confirmer mot de passe"]');
  await page.fill('[placeholder="Confirmer mot de passe"]', "testes");
  await page.click(".btn");
  await page.click(".fa-sign-out-alt");
});

test("Connexion", async () => {
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
});



/** run with npx qawolf test */
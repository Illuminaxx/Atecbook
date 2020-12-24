const qawolf = require("qawolf");

let browser
let context

beforeAll(async () => {
    browser = await qawolf.launch();
    context = await browser.newContext();
    await qawolf.register(context);
});

afterAll(async () => {
    await qawolf.stopVideos();
    await browser.close();
});

test("fill posts section", async () => {
    const page = await context.newPage();
    await page.goto("https://atecbook.herokuapp.com/", {waitUntil: "domcontentloaded"});
    await page.click(".btn-light");
    await page.click('[name="email"]');
    await page.fill('[name="email"]', "gendice62@gmail.com");
    await page.click('[name="password"]')
    await page.fill('[name="password"]', "semperfidelis62.")
    await page.click(".btn");
    await page.click("text=Posts");
    await page.click('[name="text"]');
    await page.fill('[name="text"]', "test fill post section 22/12/2020");
    await page.click(".btn");
});

test("Add comments to post", async () => {
    const page = await context.newPage();
    await page.goto("https://atecbook.herokuapp.com/", {waitUntil: "domcontentloaded"});
    await page.click(".btn-light");
    await page.click('[name="email"]');
    await page.fill('[name="email"]', "gendice62@gmail.com");
    await page.click('[name="password"]')
    await page.fill('[name="password"]', "semperfidelis62.")
    await page.click(".btn");
    await page.click("text=Posts");
    await page.click(".btn-light");
    await page.click(".btn-primary");
    await page.click('[name="text"]');
    await page.fill('[name="text"]', "ceci est un commentaire");
    await page.click(".btn-dark");
    await page.click(".btn");
    await page.click(".fa-sign-out-alt");
});

test("Add a like to the post", async () => {
    const page = await context.newPage();
    await page.goto("https://atecbook.herokuapp.com/", {waitUntil: "domcontentloaded"});
    await page.click(".btn-light");
    await page.click('[name="email"]');
    await page.fill('[name="email"]', "gendice62@gmail.com");
    await page.click('[name="password"]')
    await page.fill('[name="password"]', "semperfidelis62.")
    await page.click(".btn");
    await page.click("text=Posts");
    await page.click('[name="text"]');
    await page.fill('[name="text"]', "test");
    await page.click(".btn");
    await page.click(".btn-light");
    await page.click(".fa-sign-out-alt");
});
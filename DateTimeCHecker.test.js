const puppeteer = require('puppeteer');

describe('Date Checker E2E Tests', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: false, // Set to true for headless mode
      // slowMo: 100,  // Slow down interactions for easier debugging (optional)
    });
    page = await browser.newPage();
    await page.goto('http://localhost:5173'); // Replace with your app's URL
  });

  beforeEach(async () => {
    await page.reload();
    await page.click('input[type="reset"]');
  });

  it('should show logo and correct heading', async () => {
    await expect(page).toMatchElement('h1', { text: 'Date Time Checker' });
    const logo = await page.$('img[alt="Screenshot"]');
    expect(await logo.screenshot()).toMatchImageSnapshot(); 
  });

  const testCases = [
    { day: '15', month: '06', year: '2024', expectedResult: 'Valid Date' },
    { day: '31', month: '02', year: '2024', expectedResult: 'Invalid Date' },
    { day: '29', month: '02', year: '2024', expectedResult: 'Valid Date' }, // Leap year
    { day: '32', month: '01', year: '2024', expectedResult: 'Input data for Day is out of range!' },
    { day: '30', month: '04', year: '2024', expectedResult: 'Valid Date' },
    { day: '31', month: '04', year: '2024', expectedResult: 'Invalid Date' },
    { day: 'abc', month: '06', year: '2024', expectedResult: 'Input data for Day is not a number' },
    { day: '15', month: 'hello', year: '2024', expectedResult: 'Input data for Month is not a number' },
    { day: '15', month: '06', year: 'xyz', expectedResult: 'Input data for Year is not a number' },
    { day: '15', month: '13', year: '2024', expectedResult: 'Input data for Month is out of range!' },
    { day: '0', month: '06', year: '2024', expectedResult: 'Input data for Day is out of range!' },
    { day: '15', month: '06', year: '999', expectedResult: 'Input data for Year is out of range!' },
    { day: '15', month: '06', year: '3001', expectedResult: 'Input data for Year is out of range!' },
  ];

  testCases.forEach(({ day, month, year, expectedResult }) => {
    it(`should show "${expectedResult}" for ${day}/${month}/${year}`, async () => {
      await page.type('#day', day);

      await page.type('#month', month);

      await page.type('#year', year);

      await page.click('button[type="button"]');
      await page.waitForSelector('.modal-body');
      const modalText = await page.$eval('.modal-body', el => el.textContent);
      expect(modalText.trim()).toBe(expectedResult);

      await page.click('.modal-footer button'); // Close the modal
    });
  });

  afterAll(async () => {
    await browser.close();
  });
});

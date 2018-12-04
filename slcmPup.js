
//Uses Puppeteer module to extract HTML from SLCM Academics Detail loaded by using reg no. and password submitted by the user.

//Variables to be sent: reg and pass
//reg: User Registration Number
//pass: User Password

const puppeteer = require('puppeteer');

let scrape = async (reg,pass) => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  await page.goto('http://slcm.manipal.edu/loginform.aspx');
  await page.waitFor(1000);
  await page.type('#txtUserid',reg);
  await page.type('#txtpassword',pass);
  await page.click('#btnLogin')
  await page.waitFor(1000);
  await page.goto('http://slcm.manipal.edu/Academics.aspx');
  await page.waitFor(1000);
  const result = await page.evaluate(() => {
        let attendance = document.querySelector('table#tblAttendancePercentage').innerText;
        let marks = document.querySelector('.internalMarks').innerText;
        const strippedAtt = attendance.replace(/\s+/g,' ').trim()
        const strippedMarks = marks.replace(/\s+/g,' ').trim()

        return {
            strippedAtt,
            strippedMarks
        }

    });
  browser.close();
  return result;
};

//scrape(reg,pass).then((value) => {
    //console.log(value);
//});

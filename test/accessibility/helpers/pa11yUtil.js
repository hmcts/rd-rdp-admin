

const pa11y = require('pa11y');
const assert = require('assert');
const {conf} = require('../config/config');

const jwt = require('jsonwebtoken');
const puppeteer = require('puppeteer');


const fs = require('fs');

let userRoles = [];
function pa11yTestUserRoles(roles){
    userRoles = roles;
}

async function pa11ytest(test,actions,timeoutVal) {
    console.log("pally test with actions : " + test.test.title);
    console.log(actions);

    let screenshotPath = process.env.PWD + "/" + conf.reportPath + 'assets/';
    if (!fs.existsSync(screenshotPath)) {
        fs.mkdirSync(screenshotPath, { recursive: true });
    }
    screenshotName = Date.now() + '.png'; 
    screenshotPath = screenshotPath + Date.now()+'.png';
    screenshotReportRef = 'assets/' + screenshotName;

    const startTime = Date.now();

    let token = jwt.sign({
    data: 'foobar'
    }, 'secret', { expiresIn: 60 * 60 });

    const encodedRoles = encodeURIComponent(userRoles.length > 0 ? 'j:' + JSON.stringify(userRoles) : 'j:["prd-admin"]')

    const cookies = [
        {
        name: '__auth__',
        value: token,
        domain: 'localhost:4200',
        path: '/',
        httpOnly: false,
        secure: false,
        session: true,
        },
        {
            name: 'roles',
            value: encodedRoles,
            domain: 'localhost:4200',
            path: '/',
            httpOnly: false,
            secure: false,
            session: true,
        }
    ];
    const browser = await puppeteer.launch({
        ignoreHTTPSErrors: false,
        headless: conf.headless 
    });
    const page = await browser.newPage();
    await page.setCookie(...cookies);
    await page.goto("http://localhost:4200/");


    let result;
    try{

        result = await pa11y(conf.baseUrl, {
                browser: browser,
                page: page,
            timeout: 60000,
            screenCapture: screenshotPath,
            log: {
                debug: console.log,
                error: console.error,
                info: console.info
            },
            actions: actions
        })
    }catch(err){
        userRoles = [];
        await page.screenshot({ path: screenshotPath});
        const elapsedTime = Date.now() - startTime;
        result = {}; 
        result.executionTime = elapsedTime;
        result.screenshot = screenshotReportRef;
        test.a11yResult = result;
        console.log("Test Execution time : " + elapsedTime);
        console.log(err);
        await page.close();
        await browser.close();
        throw err;

    }
    userRoles = []; 
    await page.close();
    await browser.close();
    const elapsedTime = Date.now() - startTime;
    result.executionTime = elapsedTime;
    result.screenshot = screenshotReportRef;
    test.a11yResult = result;
    console.log("Test Execution time : "+elapsedTime);
    if (conf.failTestOna11yIssues){
        assert(result.issues.length === 0, "a11y issues reported") 
    }
    return result;

}

 

module.exports = { pa11ytest, pa11yTestUserRoles}

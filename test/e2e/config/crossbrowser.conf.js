const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const minimist = require('minimist');
const argv = minimist(process.argv.slice(2));

const config = {
  framework: 'custom',
  frameworkPath: require.resolve('protractor-cucumber-framework'),

  sauceSeleniumAddress: 'ondemand.eu-central-1.saucelabs.com:443/wd/hub',

  host: 'ondemand.eu-central-1.saucelabs.com',
  sauceRegion: 'eu',
  port: 80,
  sauceConnect: true,
  specs: ['../features/**/*.feature'],

  baseUrl: (process.env.TEST_URL || 'http://localhost:3000/').replace('https', 'http'),

  params: {
    serverUrls: process.env.TEST_URL || 'http://localhost:3000/',
    targetEnv: argv.env || 'local',
    //username: process.env.TEST_EMAIL,
    //password: process.env.TEST_PASSWORD,
    username: 'vmuniganti@mailnesia.com',
    password: 'Monday01',
  },


  sauceProxy: 'http://proxyout.reform.hmcts.net:8080',  // Proxy for the REST API
  sauceUser: process.env.SAUCE_USERNAME,
  sauceKey: process.env.SAUCE_ACCESS_KEY,
  SAUCE_REST_ENDPOINT: 'https://eu-central-1.saucelabs.com/rest/v1/',
  allScriptsTimeout: 111000,

  useAllAngular2AppRoots: true,
  multiCapabilities: [
    {
      browserName: 'chrome',
      version: 'latest',
      platform: 'Windows 10',
      name: 'chrome-tests',
      tunnelIdentifier: 'reformtunnel',
      extendedDebugging: true,
      sharedTestFiles: false,
      maxInstances: 1
    },
  ],

  exclude: [],

  cucumberOpts: {
    strict: true,
    format: ['node_modules/cucumber-pretty', 'json:cb_reports/saucelab_results.json'],
    require: ['../support/world.js', '../support/*.js', '../features/step_definitions/**/*.steps.js'],
    tags: ['@crossbrowser']
  },


  plugins: [
    {
      package: 'protractor-multiple-cucumber-html-reporter-plugin',
      options: {
        automaticallyGenerateReport: true,
        removeExistingJsonReportFile: true,
        reportName: 'XUI AO CrossBrowser Tests',
        jsonDir: 'reports/tests/crossbrowser',
        reportPath: 'reports/tests/crossbrowser'

      }
    }
  ],

  onPrepare() {
    const caps = browser.getCapabilities();
    browser.manage()
      .window()
      .maximize();
    browser.waitForAngularEnabled(false);
    global.expect = chai.expect;
    global.assert = chai.assert;
    global.should = chai.should;
  }
};


exports.config = config;

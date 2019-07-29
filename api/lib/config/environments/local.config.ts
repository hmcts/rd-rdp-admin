export default {
  services: {
    idamWeb: 'https://idam-web-public.ithc.platform.hmcts.net',
    idamApi: 'https://idam-api.ithc.platform.hmcts.net',
    s2s: 'https://rpe-service-auth-provider-aat.service.core-compute-aat.internal'
  },
  proxy: {
    host: '172.16.0.7',
    port: 8080,
  },
  protocol: 'http',
  secureCookie: false,
  sessionSecret: 'secretSauce',
  logging: 'debug'
};

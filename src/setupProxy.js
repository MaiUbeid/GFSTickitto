/* eslint-disable func-names */
const { createProxyMiddleware } = require('http-proxy-middleware');

const logLevel = 'error';
/* 
  This proxies certain requests so we don't run into issues. Replicates what is done when hosted
  These rules need to be on sync with the netlify.toml
*/

module.exports = function(app) {
  // this is for the tikitto api
  app.use(
    '/tkt/api',
    createProxyMiddleware({
      target: 'http://34.89.51.164/',
      changeOrigin: true,
      pathRewrite: path => {
        return path.replace('/tkt', '');
      },
      logLevel,
    })
  );

  // this is for the ingresso api
  app.use(
    '/f13',
    createProxyMiddleware({
      target: 'https://api.ticketswitch.com',
      changeOrigin: true,
      logLevel,
    })
  );

  // TODO make this work with path rewrite, for some reason it fails of we rewrite the path
  // this is for the b2b ingresso api for the token
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://b2b.ingresso.co.uk/',
      changeOrigin: true,
      // pathRewrite: (path, req) => {
      //   return path.replace('/ingresso', '');
      // },
      logLevel,
    })
  );
};

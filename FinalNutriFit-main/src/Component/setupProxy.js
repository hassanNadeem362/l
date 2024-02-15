const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api/news',
    createProxyMiddleware({
      target: 'https://newsapi.org',
      changeOrigin: true,
      pathRewrite: {
        '^/api/news': '/v2/everything',
      },
    })
  );
};

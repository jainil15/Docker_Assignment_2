const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/posts",
    createProxyMiddleware({
      target: "http://host.docker.internal:8800/api",
      changeOrigin: true,
    })
  );
  app.use(
    "/auths",
    createProxyMiddleware({
      target: "http://host.docker.internal:8800/api",
      changeOrigin: true,
    })
  );
  app.use(
    "/upload",
    createProxyMiddleware({
      target: "http://host.docker.internal:8800/api",
      changeOrigin: true,
    })
  );
  app.use(
    "/file",
    createProxyMiddleware({
      target: "http://host.docker.internal:8800/api",
      changeOrigin: true,
    })
  );
};

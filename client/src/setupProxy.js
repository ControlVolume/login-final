const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://localhost:3010", //포트수정 5000 -> 3010
      changeOrigin: true,
    })
  );
};

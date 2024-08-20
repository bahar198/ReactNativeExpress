// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require("expo/metro-config");
const { createProxyMiddleware } = require("http-proxy-middleware");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname, {
  // [Web-only]: Enables CSS support in Metro.
  isCSSEnabled: true,
});

// Add proxy middleware
config.server = {
  enhanceMiddleware: (middleware, metroServer) => {
    return (req, res, next) => {
      if (req.url.startsWith("/api")) {
        createProxyMiddleware({
          target: "http://localhost:8082", // Your Express server URL
          changeOrigin: true,
        })(req, res, next);
      } else {
        return middleware(req, res, next);
      }
    };
  },
};

module.exports = config;

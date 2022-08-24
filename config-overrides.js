const paths = require("react-scripts/config/paths");
const path = require("path");

// "src" -> "client/src"
paths.appSrc = path.resolve(__dirname, "client/src");

// "src/index.js" -> "client/src/index.js"
paths.appIndexJs = path.resolve(__dirname, "client/src/index.js");

// "public/index.html" -> "client/public/index.html"
paths.appHtml = path.resolve(__dirname, "client/public/index.html");

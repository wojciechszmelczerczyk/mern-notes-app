import paths from "react-scripts/config/paths";
import path from "path";

// "src" -> "client/src"
paths.appSrc = path.resolve(__dirname, "src");

// "src/index.js" -> "client/src/index.js"
paths.appIndexJs = path.resolve(__dirname, "src/index.tsx");

// "public/index.html" -> "client/public/index.html"
paths.appHtml = path.resolve(__dirname, "public/index.html");

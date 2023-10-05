// 需要nodejs分析模块 所以使用Commonjs模块
const path = require("path");
const serve = require("rollup-plugin-serve");
const babel = require("@rollup/plugin-babel").default;
const resolve = require("rollup-plugin-node-resolve");
const commonjs = require("rollup-plugin-commonjs");

function glsl() {
  return {
    transform: (code, id) => {
      if (/\.glsl$/.test(id) === false) {
        return;
      }
      var transformedCode = "export default " + JSON.stringify(code);
      return {
        code: transformedCode,
        map: null,
      };
    },
  };
}

module.exports = {
  input: path.resolve(__dirname, "src/index.js"),
  output: {
    file: path.resolve(__dirname, "dist/bundle.js"),
    format: "esm",
  },
  plugins: [
    glsl(),
    babel({
      exclude: "node_modules/**",
    }),
    resolve(),
    commonjs(),
    serve({
      open: true,
      openPage: "/public/index.html",
      port: 3000,
    }),
  ],
};

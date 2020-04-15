const argv = require("yargs").argv;
const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const WasmPackPlugin = require("@wasm-tool/wasm-pack-plugin");

const dist = path.resolve(__dirname, "dist");

const isTargetNode = ["node", "nodejs"].some(
  (t) => process.env.TARGET === t || argv[t] === true
);
const isRelease = ["release"].some(
  (t) => process.env.PROFILE === t || argv[t] === true
);
const target = isTargetNode ? "nodejs" : "web";
const profile = isRelease ? "release" : "dev";

console.log("target=%s, profile=%s", target, profile);

const targetArg = target === "web" ? "" : `--target ${target}`;
const profileArg = profile === "dev" ? "" : `--${profile}`;
const extraArgs = [targetArg, profileArg].join(" ").trim();

module.exports = {
  target: target === "nodejs" ? "node" : "web",
  mode: "production",
  entry: {
    index: "./js/index.js",
  },
  output: {
    path: dist,
    filename: "[name].js",
  },
  devServer: {
    contentBase: dist,
  },
  plugins: [
    new CopyPlugin([path.resolve(__dirname, "static")]),

    new WasmPackPlugin({
      crateDirectory: __dirname,
      extraArgs,
    }),
  ],
};

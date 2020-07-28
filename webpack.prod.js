const config = require("./webpack.config.js");

const production = {
  ...config,
  mode: "production",
};

module.exports = production;

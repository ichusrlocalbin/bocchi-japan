module.exports = {
  context: __dirname,
  entry: {
    jsx: "./src/js/index.jsx",
    css: "./src/css/style.css",
    html: "./src/index.html",
  },

  output: {
    path: __dirname + "/dist",
    filename: "bundle.js",
  },
  module: {
    preLoaders: [
        //Eslint loader
      { test: /\.jsx?$/, exclude: /node_modules/, loader: "eslint-loader"},
    ],
    loaders: [
      { test: /\.html$/, loader: "file?name=[name].[ext]" },
      { test: /\.css$/, loader: "file?name=[name].[ext]" },
      { test: /\.png/, loader: "file?name=[path][name].[ext]" },
      { test: /\.jsx?$/, exclude: /node_modules/, loaders: ["react-hot","babel"]},
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  eslint: {
    configFile: './.eslintrc'
  },
};

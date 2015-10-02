module.exports = {
  context: __dirname,
  devtool: 'source-map',
  entry: "./app/index.ts",
  output: {
    path: __dirname + "/source/javascripts",
    filename: "all.js"
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.ts', '.tsx']
  },
  module: {
    loaders: [
      // note that babel-loader is configured to run after ts-loader
      { test: /\.ts(x?)$/, loader: 'bable-loader!ts-loader' }
    ]
  }
};

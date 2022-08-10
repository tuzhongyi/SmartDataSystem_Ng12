module.exports = {
  module: {
    rules: [
      {
        test: /\.csv$/,
        use: ['csv-loader']
      },
      {
        test: /\.xlsx?$/,
        loader: 'excel-loader'
      }
    ]
  }
}
const config = {
  entry: './main.js',

  output: {
    path: __dirname.replace('config', 'dist/temp.js'),
    filename: 'index.js',
  },

  module: {
    rules:[
      {
        test: /\.css$/,
        use: [
          {loader: 'style-loader'},
          {loader: 'css-loader'}
        ],
      },

      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react'],
        }
      },

      {
        test: /\.(png|svg|jpg|gif)$/,
        use:[
          {loader: 'file-loader'}
        ]
      },
        
      { 
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff' 
      },
          
      { 
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader' 
      },
        
      

    ]
  }
};
        
module.exports = config;
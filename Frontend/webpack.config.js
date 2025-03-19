// module.exports = {
//     // Other webpack configuration options
//     module: {
      
//       rules: [
//          {
//         test: /\.(js|jsx)$/,
//         exclude: /node_modules/,
//         use: ["babel-loader"],            
//       },
//       {
//         test: /\.css$/,
//         use: [ 'style-loader', 'css-loader' ]
//       }
//       ],
//     },
//   };
module.exports = {
  // Other webpack configuration options
  module: {
    
    rules: [
       {
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: ["babel-loader"],            
    },
    {
      test: /\.css$/,
      use: [ 'style-loader', 'css-loader' ],
      
    }
    ],
  },
};

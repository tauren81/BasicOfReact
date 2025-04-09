import path from 'path';

const config = {
  entry: './src/main.tsx',
  mode: 'development',
  module: {
    rules: [
      {
        exclude: [/node_modules/, /public/],
        test: /\.(js|jsx|tsx)$/i,
        loader: 'babel-loader',
        //loader: 'ts-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    path: path.resolve('./public/'),
  },
  plugins: [],
  devServer: {
    static: {
      directory: path.resolve('./public/'),
    },
    compress: true,
    port: 9000,
  },
};

export default config;

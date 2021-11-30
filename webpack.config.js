const path = require('path')
const webpack = require('webpack')

module.exports = {
  mode: 'development',
  target: 'node',
  optimization: {
    minimize: false
  },
  externals: [
    'bson-ext',
    'kerberos',
    'snappy',
    'aws4',
    'mongodb-client-encryption',
    'sqlite3',
    'nock',
    'aws-sdk',
    'mock-aws-s3'
  ],
  resolve: {
    extensions: ['.gql', '...'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      graphql$: path.resolve(__dirname, 'node_modules/graphql/index.js')
    }
  },
  module: {
    rules: [
      { test: /\.gql$/, use: 'raw-loader' },
    ]
  }
}
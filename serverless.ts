import type { AWS } from '@serverless/typescript';

const serverlessConfiguration: AWS = {
  service: 'ts-socket-api',
  frameworkVersion: '2',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true
    }
  },
  // Add the serverless-webpack plugin
  plugins: ['serverless-webpack'],
  provider: {
    name: 'aws',
    runtime: 'nodejs12.x',
    apiGateway: {
      minimumCompressionSize: 1024,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      TABLE_NAME: 'socket-lambda'
    },
  },
  functions: {
    hello: {
      handler: 'handler.hello',
      events: [
        {
          websocket: {
            route: "$connect",
          },
        }, {
          websocket: {
            route: "$disconnect",
          },
        },
        {
          websocket: {
            route: "$default",
          },
        },
      ]
    },
    dynamo: {
      handler: 'dynamo.main',

    }
  }
}

module.exports = serverlessConfiguration;

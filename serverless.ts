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
      minimumCompressionSize: 128,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      TABLE_NAME: ''
    },
  },
  functions: {
    connect: {
      handler: './src/socket/connect.connectHandler',
      events: [
        {
          websocket: {
            route: "$connect",
          },
        }, 
      ]
    },
    disconnect: {
      handler: './src/socket/disconnect.disconnectHandler',
      events: [
        {
          websocket: {
            route: "$disconnect",
          },
        }, 
      ]
    },
    default: {
      handler: './src/socket/default.defaultHandler',
      events: [
        {
          websocket: {
            route: "$default",
          },
        }, 
      ]
    },
    dynamo: {
      handler: './src/database/dynamo.dynamoHandler',
    }
  }
}

module.exports = serverlessConfiguration;

import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
var AWS = require('aws-sdk');
var sqs = new AWS.SQS({ apiVersion: '2012-11-05' });
AWS.config.update({ region: 'us-east-1' });
export const hello: APIGatewayProxyHandler = async (event, _context) => {    
  try {  
    const{ body, requestContext: {connectionId}} = event;

    const sqsMessage = {
      MessageAttributes: {
        "connectionId": {
          DataType: "String",
          StringValue: connectionId
        },
        "message": {
          DataType: "String",
          StringValue: body
        }
      },
      MessageBody: 'dynamodb event',
      QueueUrl: "https://sqs.us-east-1.amazonaws.com/149239330696/socket-fila"
    }

    await sqs.sendMessage(sqsMessage).promise()
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: body,
      }, null, 2),
    };
  } catch (error) {
    console.log("fucking error", error)
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: error,
      }, null, 2),
    };
  }
}

import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import * as AWS from 'aws-sdk'
var sqs = new AWS.SQS({ apiVersion: '2012-11-05' });
AWS.config.update({ region: 'us-east-1' });
export const hello: APIGatewayProxyHandler = async (event, _context) => {
  const apiGatewayApi = new AWS.ApiGatewayManagementApi({})
  
  const connectionId = event.requestContext.connectionId;

  await  apiGatewayApi.postToConnection({ConnectionId: connectionId,Data: 'message' }).promise()

  try {
    const { body, requestContext: { connectionId, requestTime, eventType, identity: { sourceIp } } } = event;

    const message = {
      connectionId,
      eventType,
      body,
      requestTime,
      sourceIp
    }

    const sqsMessage: AWS.SQS.SendMessageRequest = {
      MessageAttributes: {
        "message": {
          DataType: "String",
          StringValue: JSON.stringify(message)
        },
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

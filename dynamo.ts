import 'source-map-support/register';
import * as AWS from 'aws-sdk'
import { v4 as uuidv4 } from 'uuid';
AWS.config.update({ region: 'us-east-1' });
export const main = async (event, _context) => {
  const dynamo = new AWS.DynamoDB.DocumentClient()

  try {

    const { stringValue } = event.Records[0].messageAttributes.message

    var params: AWS.DynamoDB.DocumentClient.PutItemInput = {
      TableName: process.env.TABLE_NAME,
      Item: { id: uuidv4(), ...JSON.parse(stringValue) }
    };

    const document = await dynamo.put(params).promise()

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: document,
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

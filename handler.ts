import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';

export const hello: APIGatewayProxyHandler = async (event, _context) => {
  console.log(event)
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: '',
      input: `mensagem ${event.body}`,
    }, null, 2),
  };
}

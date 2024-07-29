// lambda handler function will go here

import { APIGatewayEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { S3 } from "aws-sdk";
import { v4 as uuid } from "uuid";

const S3Client = new S3();

export const handler = async (
  event: APIGatewayEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  console.log(`CONTEXT: ${JSON.stringify(context)}`);

  // grab the file name from query string
  const file = event.queryStringParameters?.file;
  
  // give unique name of that file
  const fileName = `${uuid}__${file}`;
  
  // create s3 params
  const s3Params = {
    Bucket: process.env.BUCKET_NAME,
    Key: fileName,
    ContentType: "image/jpeg",
  };
  
  // get signed url
  const url = S3Client.getSignedUrlPromise("putObject", s3Params);
  
  // give it back to the client for upload image
  console.log("UPLOAD URL ", url);

  return {
    statusCode: 200,
    body: JSON.stringify({
      url,
      Key: fileName,
    }),
  };
};

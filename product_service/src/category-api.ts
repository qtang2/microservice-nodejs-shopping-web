// lambda handler function will go here

import { APIGatewayEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { ErrorResponse } from "./utility/response";
import  "./utility";
import { CategoryRepository } from "./repository/category-repository";
import { CategoryService } from "./services/category-service";
import middy from "@middy/core";
import bodyParser from "@middy/http-json-body-parser";


console.log('init product api');

export const handler = middy( async (
  event: APIGatewayEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  console.log(`CONTEXT: ${JSON.stringify(context)}`);

  const isRoot = event.pathParameters === null
  const service = new CategoryService(new CategoryRepository());

  switch (event.httpMethod.toLowerCase()) {
    case "post":
      if (isRoot) {
        return service.createCategory(event);
      }

      break;
    case "get":
      // isRoot? get all product: get product by id
      return isRoot ? service.getCategorys(event) : service.getCategory(event);
      break;
    case "put":
      if (!isRoot) {
        return service.editCategory(event);
      }

      break;
    case "delete":
      if (!isRoot) {
        // call edit product service
        return service.deleteCategory(event);
      }

      break;

    default:
      break;
  }
  return service.ResponseWithError(event)
//   return ErrorResponse(404, "request method not allowed!");
}).use(bodyParser())

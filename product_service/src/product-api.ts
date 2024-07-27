// lambda handler function will go here

import { APIGatewayEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { ErrorResponse } from "./utility/response";
import { ProductService } from "./services/product-service";
import { ProductRepository } from "./repository/product-repository";

export const handler = async (
  event: APIGatewayEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  console.log(`CONTEXT: ${JSON.stringify(context)}`);

  const isRoot = event.pathParameters === null
  const service = new ProductService(new ProductRepository());

  switch (event.httpMethod.toLowerCase()) {
    case "post":
      if (isRoot) {
        return service.createProduct();
      }

      break;
    case "get":
      // isRoot? get all product: get product by id
      return isRoot ? service.getProducts() : service.getProduct();
      break;
    case "put":
      if (!isRoot) {
        return service.editProduct();
      }

      break;
    case "delete":
      if (!isRoot) {
        // call edit product service
        return service.deleteProduct();
      }

      break;

    default:
      break;
  }
  return ErrorResponse(404, "request method not allowed!");
};

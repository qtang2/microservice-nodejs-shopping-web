// lambda handler function will go here

import { APIGatewayEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import "./utility";
import middy from "@middy/core";
import jsonBodyParser from "@middy/http-json-body-parser";
import { ProductService } from "./services/product-service";
import { ProductRepository } from "./repository/product-repository";

console.log("init product api");

const service = new ProductService(new ProductRepository());
export const handler = middy(
  (
    event: APIGatewayEvent,
    context: Context
  ): Promise<APIGatewayProxyResult> => {
    console.log(`EVENT: `, event);
    console.log(`CONTEXT: `, context);
    
    return service.handleQueueOperation(event);
  }
).use(jsonBodyParser());

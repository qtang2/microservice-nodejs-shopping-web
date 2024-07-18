import { APIGatewayProxyEventV2 } from "aws-lambda";
import middy from "@middy/core";
import bodyParser from "@middy/http-json-body-parser";
import {container} from 'tsyringe'
import { ErrorResponse } from "../utility/response";
import { UserService } from "../service/userService";
UserService;

const service = container.resolve(UserService);
export const Signup = middy(async (event: APIGatewayProxyEventV2) => {
  return service.CreateUser(event);
}).use(bodyParser());

export const Login = async (event: APIGatewayProxyEventV2) => {
  console.log(event);
  return service.UserLogin(event);
};

export const Verify = async (event: APIGatewayProxyEventV2) => {
  console.log(event);
  return service.VerifyUser(event);
};

export const Profile = async (event: APIGatewayProxyEventV2) => {
  console.log(event);
  const httpMethod = event.requestContext.http.method.toLowerCase();
  if (httpMethod === "post") {
    return service.CreateProfile(event);
  } else if (httpMethod === "put") {
    return service.EditProfile(event);
  } else if (httpMethod === "get") {
    return service.GetProfile(event);
  } else {
    return ErrorResponse(404, "requested method is not supported!");
  }
};

export const Cart = async (event: APIGatewayProxyEventV2) => {
  console.log(event);
  const httpMethod = event.requestContext.http.method.toLowerCase();
  if (httpMethod === "post") {
    return service.CreateCart(event);
  } else if (httpMethod === "put") {
    return service.EditCart(event);
  } else if (httpMethod === "get") {
    return service.GetCart(event);
  } else {
    return ErrorResponse(404, "requested method is not supported!");
  }
};
export const Payment = async (event: APIGatewayProxyEventV2) => {
  console.log(event);
  const httpMethod = event.requestContext.http.method.toLowerCase();
  if (httpMethod === "post") {
    return service.CreatePayment(event);
  } else if (httpMethod === "put") {
    return service.EditPayment(event);
  } else if (httpMethod === "get") {
    return service.GetPayment(event);
  } else {
    return ErrorResponse(404, "requested method is not supported!");
  }
};

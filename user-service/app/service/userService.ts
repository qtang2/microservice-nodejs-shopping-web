import { SuccessResponse } from "../utility/response";
import { APIGatewayProxyEventV2 } from "aws-lambda";

export class UserService {
  constructor() {}

  CreateUser = (event: APIGatewayProxyEventV2) => {
    console.log("CreateUser event ==>", event);

    const body = event.body
    console.log("CreateUser event ==>", body);


    return SuccessResponse({ message: "sign up response" });
  };
  UserLogin = (event: APIGatewayProxyEventV2) => {
    return SuccessResponse({ message: "UserLogin response" });
  };
  VerifyUser = (event: APIGatewayProxyEventV2) => {
    return SuccessResponse({ message: "VerifyUser response" });
  };

  /**
   * User Profile
   */
  CreateProfile = (event: APIGatewayProxyEventV2) => {
    return SuccessResponse({ message: "CreateProfile response" });
  };
  GetProfile = (event: APIGatewayProxyEventV2) => {
    return SuccessResponse({ message: "GetProfile response" });
  };
  EditProfile = (event: APIGatewayProxyEventV2) => {
    return SuccessResponse({ message: "EditProfile response" });
  };
  /**
   * Cart
   */
  CreateCart = (event: APIGatewayProxyEventV2) => {
    return SuccessResponse({ message: "CreateCart response" });
  };
  GetCart = (event: APIGatewayProxyEventV2) => {
    return SuccessResponse({ message: "GetCart response" });
  };
  EditCart = (event: APIGatewayProxyEventV2) => {
    return SuccessResponse({ message: "EditCart response" });
  };
  /**
   * Payment
   */
  CreatePayment = (event: APIGatewayProxyEventV2) => {
    return SuccessResponse({ message: "CreatePayment response" });
  };
  GetPayment = (event: APIGatewayProxyEventV2) => {
    return SuccessResponse({ message: "GetPayment response" });
  };
  EditPayment = (event: APIGatewayProxyEventV2) => {
    return SuccessResponse({ message: "EditPayment response" });
  };
}

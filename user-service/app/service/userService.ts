import { autoInjectable } from "tsyringe";
import { UserRepository } from "../repository/userRepository";
import { SuccessResponse } from "../utility/response";
import { APIGatewayProxyEventV2 } from "aws-lambda";

@autoInjectable() // inject whatever needed to create this user service
export class UserService {
  repository: UserRepository;
  constructor(repository: UserRepository) {
    this.repository = repository;
  }

  async CreateUser(event: APIGatewayProxyEventV2) {
    console.log("CreateUser event ==>", event);

    const body = event.body;
    console.log("CreateUser event ==>", body);

    await this.repository.CreateUserOperation();

    return SuccessResponse({ message: "sign up response" });
  }
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

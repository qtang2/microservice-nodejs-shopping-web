import { autoInjectable } from "tsyringe";
import { APIGatewayProxyEventV2 } from "aws-lambda";
import { plainToClass } from "class-transformer";
import { UserRepository } from "../repository/userRepository";
import { ErrorResponse, SuccessResponse } from "../utility/response";
import { SignupInput } from "../models/dto/SignupInputs";
import { AppValidation } from "../utility/errors";
import { GetHashedPassword, GetSalt } from "../utility/password";
import { UserModel } from "../models/UserModel";
import { LoginInput } from "../models/dto/LoginInputs";

@autoInjectable() // inject whatever needed to create this user service
export class UserService {
  repository: UserRepository;
  constructor(repository: UserRepository) {
    this.repository = repository;
  }

  async CreateUser(event: APIGatewayProxyEventV2) {
    try {
      const body = event.body;

      const input = plainToClass(SignupInput, body);

      const error = await AppValidation(input);

      if (error) return ErrorResponse(404, error);

      const { email, password, phone } = input;

      const salt = await GetSalt();
      const hashedPw = await GetHashedPassword(password, salt);

      const data = await this.repository.CreateAccount({
        email,
        phone,
        password: hashedPw,
        userType: "BUYER",
        salt,
      });

      if (data) return SuccessResponse(data as UserModel);
    } catch (error) {
      console.log("CreateUser error ==>", error);
      return ErrorResponse(500, error);
    }
  }
  UserLogin = async (event: APIGatewayProxyEventV2) => {
    try {
      const body = event.body;

      const input = plainToClass(LoginInput, body);

      const error = await AppValidation(input);

      if (error) return ErrorResponse(404, error);

      const { email, password } = input;

      // const salt = await GetSalt();
      // const hashedPw = await GetHashedPassword(password, salt);

      const data = await this.repository.FindAccount(email);

      if (data) return SuccessResponse(data as UserModel);
    } catch (error) {
      console.log("UserLogin error ==>", error);
      return ErrorResponse(500, error);
    }
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

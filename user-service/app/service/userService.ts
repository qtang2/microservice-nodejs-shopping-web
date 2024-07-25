import { autoInjectable } from "tsyringe";
import { APIGatewayProxyEventV2 } from "aws-lambda";
import { plainToClass } from "class-transformer";
import { UserRepository } from "../repository/userRepository";
import { ErrorResponse, SuccessResponse } from "../utility/response";
import { SignupInput } from "../models/dto/SignupInputs";
import { AppValidation } from "../utility/errors";
import {
  GetHashedPassword,
  GetSalt,
  GetToken,
  ValidatePassword,
  VerifyToken,
} from "../utility/password";
import { UserModel } from "../models/UserModel";
import { LoginInput } from "../models/dto/LoginInputs";
import {
  GenerateAccessCode,
  SendVerificationCode,
} from "../utility/notification";
import { VerificationInput } from "../models/dto/UpdateInput";
import { TimeDifference } from "../utility/dateHelper";
import { ProfileInput } from "../models/dto/AddressInput";

@autoInjectable() // inject whatever needed to create this user service
export class UserService {
  repository: UserRepository;
  constructor(repository: UserRepository) {
    this.repository = repository;
  }

  async ResponseWithError(event: APIGatewayProxyEventV2) {
    return ErrorResponse(404, "request method is not supported");
  }

  async CreateUser(event: APIGatewayProxyEventV2) {
    try {
      const input = plainToClass(SignupInput, event.body);

      const error = await AppValidation(input);

      if (error) return ErrorResponse(404, error);

      const { email, password, phone } = input;

      const salt = await GetSalt();
      const hashedPw = await GetHashedPassword(password, salt);

      const data = await this.repository.createAccount({
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
      const input = plainToClass(LoginInput, event.body);

      const error = await AppValidation(input);

      if (error) return ErrorResponse(404, error);

      const { email, password } = input;

      const data = await this.repository.findAccount(email);

      const verified = await ValidatePassword(
        password,
        data.password,
        data.salt
      );
      if (!verified) {
        throw Error("Password does not match!");
      }

      const token = GetToken(data);

      if (data && token) return SuccessResponse({ token });
    } catch (error) {
      console.log("UserLogin error ==>", error);
      return ErrorResponse(500, error);
    }
  };
  GetVerificationToke = async (event: APIGatewayProxyEventV2) => {
    const token = event.headers.authorization;
    if (!token) return ErrorResponse(403, "authorization failed");

    const payload = VerifyToken(token);

    if (!payload || !payload.user_id)
      return ErrorResponse(403, "authorization failed");

    const { code, expiry } = GenerateAccessCode();
    // save on DB to confirm the verification
    await this.repository.updateVerificationCode(payload.user_id, code, expiry);
    const response = SendVerificationCode(code, payload.phone);
    return SuccessResponse({
      message: "Verification code is sent to your registered mobile number!",
    });
  };
  VerifyUser = async (event: APIGatewayProxyEventV2) => {
    const token = event.headers.authorization;
    if (!token) return ErrorResponse(403, "authorization failed");

    const payload = VerifyToken(token);

    if (!payload || !payload.user_id)
      return ErrorResponse(403, "authorization failed");

    const input = plainToClass(VerificationInput, event.body);

    const error = await AppValidation(input);

    if (error) return ErrorResponse(404, error);

    const userAccount = await this.repository.findAccount(payload.email);
    const { verification_code, expiry } = userAccount;

    if (verification_code === parseInt(input.code) && expiry) {
      const diff = TimeDifference(expiry, new Date().toISOString(), "m");
      if (diff > 0) {
        console.log("verified successfully");
        await this.repository.updateVerifyUser(payload.user_id);
      } else {
        return ErrorResponse(404, "Verification code is expired");
      }
    }
    return SuccessResponse({ message: "User verified" });
  };

  /**
   * User Profile
   */
  CreateProfile = async (event: APIGatewayProxyEventV2) => {
    try {
      const token = event.headers.authorization;
      if (!token) return ErrorResponse(403, "authorization failed");

      const payload = VerifyToken(token);

      if (!payload || !payload.user_id)
        return ErrorResponse(403, "authorization failed");

      const input = plainToClass(ProfileInput, event.body);

      const error = await AppValidation(input);

      if (error) return ErrorResponse(404, error);

      // DB operation
      const result = await this.repository.createProfile(
        payload.user_id,
        input
      );
      console.log(result);

      return SuccessResponse({ message: "CreateProfile response" });
    } catch (error) {
      console.log("CreateProfile error ==>", error);
      return ErrorResponse(500, error);
    }
  };
  GetProfile = async (event: APIGatewayProxyEventV2) => {
    try {
      const token = event.headers.authorization;
      if (!token) return ErrorResponse(403, "authorization failed");

      const payload = VerifyToken(token);

      if (!payload || !payload.user_id)
        return ErrorResponse(403, "authorization failed");

      const result = await this.repository.getProfile(payload.user_id);
      console.log(result);
      return SuccessResponse(result);
    } catch (error) {
      console.log("GetProfile error ==>", error);
      return ErrorResponse(500, error);
    }
  };
  EditProfile = async (event: APIGatewayProxyEventV2) => {
    try {
      const token = event.headers.authorization;
      if (!token) return ErrorResponse(403, "authorization failed");

      const payload = VerifyToken(token);

      if (!payload || !payload.user_id)
        return ErrorResponse(403, "authorization failed");

      const input = plainToClass(ProfileInput, event.body);

      const error = await AppValidation(input);

      if (error) return ErrorResponse(404, error);

      // DB operation
      const result = await this.repository.editProfile(payload.user_id, input);
      console.log('service EditProfile', result);

      return SuccessResponse({ message: "profile updated!" });
    } catch (error) {
      console.log("EditProfile error ==>", error);
      return ErrorResponse(500, error);
    }
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

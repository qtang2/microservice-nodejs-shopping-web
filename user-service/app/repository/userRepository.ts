import { DBClient } from "../utility/databaseClient";
import { UserModel } from "../models/UserModel";
import { DBOperation } from "./dbOperation";
import { ProfileInput } from "../models/dto/AddressInput";
import { AddressModel } from "../models/AddressModel";
// handle data access layer

export class UserRepository extends DBOperation {
  constructor() {
    super();
  }

  async createAccount({ email, password, salt, phone, userType }: UserModel) {
    console.log("UserRepository createAccount in DB");

    const queryString =
      "INSERT INTO users(phone, email, password, salt, user_type) VALUES($1,$2,$3,$4,$5) RETURNING *";
    const values = [phone, email, password, salt, userType];
    const result = await this.executeQuery(queryString, values);
    console.log("UserRepository createAccount in DB result", result);

    if (result.rowCount && result.rowCount > 0) {
      return result.rows[0] as UserModel;
    }
  }
  async findAccount(email: string) {
    console.log("UserRepository findAccount in DB");

    const queryString =
      "SELECT user_id, phone, email, user_type, salt, password, verification_code, expiry FROM users WHERE email=$1";
    const values = [email];

    const result = await this.executeQuery(queryString, values);

    if (!result.rowCount || result.rowCount < 1) {
      console.log("User does not exist with provided email id!");

      throw new Error("User does not exist with provided email id!");
    }
    return result.rows[0] as UserModel;
  }
  async updateVerificationCode(userId: number, code: number, expiry: Date) {
    console.log("UserRepository updateVerificationCode in DB");

    const queryString =
      "UPDATE users SET verification_code=$1, expiry=$2 WHERE user_id=$3  AND verified=FALSE RETURNING *";
    const values = [code, expiry, userId];
    const result = await this.executeQuery(queryString, values);
    console.log("UserRepository updateVerificationCode in DB result", result);

    if (result.rowCount && result.rowCount > 0) {
      return result.rows[0] as UserModel;
    }
    throw new Error("user already verified");
  }
  async updateVerifyUser(userId: number) {
    console.log("UserRepository updateVerificationCode in DB");

    const queryString =
      "UPDATE users SET verified=TRUE WHERE user_id=$1 AND verified=FALSE";
    const values = [userId];
    const result = await this.executeQuery(queryString, values);
    console.log("UserRepository updateVerifyUser in DB result", result);

    if (result.rowCount && result.rowCount > 0) {
      return result.rows[0] as UserModel;
    }
    throw new Error("user already verified");
  }
  async updateUser(
    userId: number,
    firstName: string,
    lastName: string,
    userType: string
  ) {
    console.log(
      "UserRepository updateUser in DB",
      firstName,
      lastName,
      userType,
      userId
    );

    const queryString =
      "UPDATE users SET first_name=$1, last_name=$2, user_type=$3 WHERE user_id=$4 RETURNING *";
    const values = [firstName, lastName, userType, userId];
    const result = await this.executeQuery(queryString, values);
    console.log("UserRepository updateUser in DB result", result);

    if (result.rowCount && result.rowCount > 0) {
      return result.rows[0] as UserModel;
    }
    throw new Error("error update user");
  }
  async createProfile(
    userId: number,
    {
      firstName,
      lastName,
      userType,
      address: { addressLine1, addressLine2, city, postCode, country },
    }: ProfileInput
  ) {
    console.log("UserRepository createProfile in DB");

    await this.updateUser(userId, firstName, lastName, userType);

    const queryString =
      "INSERT INTO addresses(user_id, address_line1, address_line2, city, post_code, country) VALUES($1,$2,$3,$4,$5,$6) RETURNING *";
    const values = [
      userId,
      addressLine1,
      addressLine2,
      city,
      postCode,
      country,
    ];
    const result = await this.executeQuery(queryString, values);

    if (result.rowCount && result.rowCount > 0) {
      return result.rows[0] as AddressModel;
    }

    throw new Error("error creating profile");
  }
  async getProfile(userId: number) {
    console.log("UserRepository getProfile in DB");

    const queryString =
      "SELECT first_name, last_name, email, phone, user_type, verified FROM users WHERE user_id=$1";
    const values = [userId];
    const result = await this.executeQuery(queryString, values);
    if (!result.rowCount) {
      throw new Error("user profile does not exist");
    }

    const profile = result.rows[0] as UserModel;

    const addressQueryString = "SELECT * FROM addresses WHERE user_id=$1";
    const addressValues = [userId];
    const addressResult = await this.executeQuery(
      addressQueryString,
      addressValues
    );

    if (addressResult.rowCount && addressResult.rowCount > 0) {
      profile.address = addressResult.rows as AddressModel[];
    }

    return profile;
  }
  async editProfile(
    userId: number,
    {
      firstName,
      lastName,
      userType,
      address: { id, addressLine1, addressLine2, city, postCode, country },
    }: ProfileInput
  ) {
    console.log("UserRepository editProfile in DB");

    await this.updateUser(userId, firstName, lastName, userType);

    const addressQueryString =
      "UPDATE addresses SET address_line1=$1, address_line2=$2, city=$3, post_code=$4, country=$5 WHERE id=$6";
    const addressValues = [
      addressLine1,
      addressLine2,
      city,
      postCode,
      country,
      id,
    ];
    const result = await this.executeQuery(addressQueryString, addressValues);

    if (!result) {
      throw new Error("error editing profile");
    }

    return true;
  }
}

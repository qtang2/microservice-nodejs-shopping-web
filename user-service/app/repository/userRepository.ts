import { DBClient } from "../utility/databaseClient";
import { UserModel } from "../models/UserModel";
import { DBOperation } from "./dbOperation";
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
  async updateVerificationCode(userId: string, code: number, expiry: Date) {
    console.log("UserRepository updateVerificationCode in DB");

    const queryString =
      "UPDATE users SET verification_code=$1, expiry=$2 WHERE user_id=$3  AND verified=FALSE RETURNING *";
    const values = [code, expiry, userId];
    const result = await this.executeQuery(queryString, values);
    console.log("UserRepository updateVerificationCode in DB result", result);

    if (result.rowCount && result.rowCount > 0) {
      return result.rows[0] as UserModel;
    }
    throw new Error('user already verified')
  }
  async updateVerifyUser(userId: string) {
    console.log("UserRepository updateVerificationCode in DB");

    const queryString =
      "UPDATE users SET verified=TRUE WHERE user_id=$1 AND verified=FALSE RETURNING *";
    const values = [userId];
    const result = await this.executeQuery(queryString, values);
    console.log("UserRepository updateVerifyUser in DB result", result);

    if (result.rowCount && result.rowCount > 0) {
      return result.rows[0] as UserModel;
    }
    throw new Error('user already verified')

  }
}

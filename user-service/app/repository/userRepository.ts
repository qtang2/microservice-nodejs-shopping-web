import { UserModel } from "../models/UserModel";
// handle data access layer

export class UserRepository {
  constructor() {}

  async CreateAccount({ email, password, salt, phone, userType }: UserModel) {
    console.log("UserRepository CreateAccount in DB");
  }
}

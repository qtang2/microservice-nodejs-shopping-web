import { UserModel } from "app/models/UserModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const APP_SECRET = "our_app_secret"; // TODO: set env for this in yml

export const GetSalt = async () => {
  return await bcrypt.genSalt();
};
export const GetHashedPassword = async (password: string, salt: string) => {
  return await bcrypt.hash(password, salt);
};
export const ValidatePassword = async (
  enteredPw: string,
  savedPw: string,
  salt: string
) => {
  return (await GetHashedPassword(enteredPw, salt)) === savedPw;
};

export const GetToken = ({ user_id, phone, email, userType }: UserModel) => {
  return jwt.sign({ user_id, phone, email, userType }, APP_SECRET, {
    expiresIn: "30d",
  });
};
export const VerifyToken = (token: string) => {
  try {
    if (token != "") {
      const payload = jwt.verify(token.split(" ")[1], APP_SECRET);
      return payload as UserModel;
    }
    return false;
  } catch (error) {
    console.log("VerifyToken error", error);
    return false;
  }
};

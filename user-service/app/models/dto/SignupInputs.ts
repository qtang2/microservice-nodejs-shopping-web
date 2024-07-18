import { Length } from "class-validator";
import { LoginInput } from "./LoginInputs";

export class SignupInput extends LoginInput {
  @Length(10, 13)
  phone: string;
}

import { Length } from "class-validator";
import { LoginInput } from "./LoginInputs";

export class VerificationInput {
  @Length(6)
  code: string;
}

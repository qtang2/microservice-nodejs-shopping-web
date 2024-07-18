import { validate, ValidationError } from "class-validator";
export const AppValidation = async (input: any) => {
  const error = await validate(input, {
    ValidationError: { target: true },
  });

  if (error.length) {
    return error;
  }
  return false;
};

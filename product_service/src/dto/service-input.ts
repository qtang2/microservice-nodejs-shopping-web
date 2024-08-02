import { IsNumber, Length } from "class-validator";

export class ServiceInput {
    action: string; // optional, GET_PRODUCT, GET_CATEGORY ect
  
    @Length(12, 24)
    productId: string;
  
  }
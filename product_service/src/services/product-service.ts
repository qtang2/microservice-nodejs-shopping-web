import { APIGatewayEvent } from "aws-lambda";

import { ProductRepository } from "../repository/product-repository";
import { ErrorResponse, SuccessResponse } from "../utility/response";
import { plainToClass } from "class-transformer";
import { ProductInput } from "../dto/product-input";
import { AppValidation } from "../utility/errors";

export class ProductService {
  _repository: ProductRepository;
  constructor(repository: ProductRepository) {
    this._repository = repository;
  }

  async createProduct(event: APIGatewayEvent) {
    const input = plainToClass(ProductInput, JSON.parse(event.body!));

    const error = await AppValidation(input);

    if (error) return ErrorResponse(404, error);

    console.log("ProductService input=", input);

    const data = await this._repository.createProduct(input);
    console.log("ProductService input=", input);

    return SuccessResponse(data);
  }
  async getProducts(event: APIGatewayEvent) {
    return SuccessResponse({ msg: "Products!" });
  }
  async getProduct(event: APIGatewayEvent) {
    return SuccessResponse({ msg: "Product!" });
  }
  async editProduct(event: APIGatewayEvent) {
    return SuccessResponse({ msg: "Product updated!" });
  }
  async deleteProduct(event: APIGatewayEvent) {
    return SuccessResponse({ msg: "Product deleted!" });
  }
}

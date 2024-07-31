import { APIGatewayEvent } from "aws-lambda";

import { ProductRepository } from "../repository/product-repository";
import { ErrorResponse, SuccessResponse } from "../utility/response";
import { plainToClass } from "class-transformer";
import { ProductInput } from "../dto/product-input";
import { AppValidation } from "../utility/errors";
import { CategoryRepository } from "../repository/category-repository";

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

    await new CategoryRepository().addItem({
      id: input.category_id,
      products: [data._id as string],
    });

    return SuccessResponse(data);
  }
  async getProducts(event: APIGatewayEvent) {
    const data = await this._repository.getAllProducts();
    return SuccessResponse(data);
  }
  async getProduct(event: APIGatewayEvent) {
    const productId = event.pathParameters?.id;
    if (!productId) return ErrorResponse(403, "please provide product id");

    const data = await this._repository.getProduct(productId);
    return SuccessResponse(data);
  }
  async editProduct(event: APIGatewayEvent) {
    const productId = event.pathParameters?.id;
    if (!productId) return ErrorResponse(403, "please provide product id");
    const input = plainToClass(ProductInput, JSON.parse(event.body!));

    const error = await AppValidation(input);

    if (error) return ErrorResponse(404, error);

    console.log("ProductService input=", input);

    input.id = productId;

    const data = await this._repository.updateProduct(input);

    return SuccessResponse(data);
  }
  async deleteProduct(event: APIGatewayEvent) {
    const productId = event.pathParameters?.id;
    if (!productId) return ErrorResponse(403, "please provide product id");

    const { category_id, deleteResult } = await this._repository.deleteProduct(
      productId
    );
    await new CategoryRepository().removeItem({
      id: category_id,
      products: [productId],
    });
    return SuccessResponse(deleteResult);
  }
}

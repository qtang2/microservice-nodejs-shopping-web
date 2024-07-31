import { plainToClass } from "class-transformer";
import { APIGatewayEvent } from "aws-lambda";
import { CategoryRepository } from "../repository/category-repository";
import { AppValidation } from "../utility/errors";
import { ErrorResponse, SuccessResponse } from "../utility/response";
import { CategoryInput } from "../dto/category-input";

export class CategoryService {
  _repository: CategoryRepository;
  constructor(repository: CategoryRepository) {
    this._repository = repository;
  }
  async ResponseWithError(event: APIGatewayEvent) {
    return ErrorResponse(404, new Error("method not allowed!"));
  }
  async createCategory(event: APIGatewayEvent) {
    const input = plainToClass(CategoryInput, event.body);

    const error = await AppValidation(input);

    if (error) return ErrorResponse(404, error);

    console.log("CategoryService input=", input);

    const data = await this._repository.createCategory(input);
    console.log("CategoryService input=", input);

    return SuccessResponse(data);
  }
  async getCategories(event: APIGatewayEvent) {
    const type = event.queryStringParameters?.type;
    if (type === "top") {
      const data = await this._repository.getTopCategories();
      return SuccessResponse(data);
    } else {
      const data = await this._repository.getAllCategories();
      return SuccessResponse(data);
    }
  }
  async getCategory(event: APIGatewayEvent) {
    const categoryId = event.pathParameters?.id;
    if (!categoryId) return ErrorResponse(403, "please provide category id");

    const data = await this._repository.getCategoryById(categoryId);
    return SuccessResponse(data);
  }
  async editCategory(event: APIGatewayEvent) {
    const categoryId = event.pathParameters?.id;
    if (!categoryId) return ErrorResponse(403, "please provide category id");
    const input = plainToClass(CategoryInput, event.body);

    const error = await AppValidation(input);

    if (error) return ErrorResponse(404, error);

    console.log("CategoryService input=", input);

    input.id = categoryId;

    const data = await this._repository.updateCategory(input);

    return SuccessResponse(data);
  }
  async deleteCategory(event: APIGatewayEvent) {
    const categoryId = event.pathParameters?.id;
    if (!categoryId) return ErrorResponse(403, "please provide category id");

    const data = await this._repository.deleteCategory(categoryId);
    return SuccessResponse(data);
  }
}

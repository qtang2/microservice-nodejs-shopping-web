import { ProductRepository } from "../repository/product-repository";
import { SuccessResponse } from "../utility/response";

export class ProductService {
  _repository: ProductRepository;
  constructor(repository: ProductRepository) {
    this._repository = repository;
  }

  async createProduct() {
    return SuccessResponse({ msg: "Product created!" });
  }
  async getProducts() {
    return SuccessResponse({ msg: "Products!" });
  }
  async getProduct() {
    return SuccessResponse({ msg: "Product!" });
  }
  async editProduct() {
    return SuccessResponse({ msg: "Product updated!" });
  }
  async deleteProduct() {
    return SuccessResponse({ msg: "Product deleted!" });
  }
}

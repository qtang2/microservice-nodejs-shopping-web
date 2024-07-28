import { ProductInput } from "../dto/product-input";
import { products } from "../models/product-model";

export class ProductRepository {
  constructor() {}

  async createProduct({
    name,
    description,
    price,
    category_id,
    image_url,
  }: ProductInput) {
    console.log('ProductRepository createProduct' );
    
    return products.create({
        name,
        description,
        price,
        category_id,
        image_url,
        availability: true
      })
  }
  async getAllProducts() {}
  async getProduct() {}
  async updateProduct({
    name,
    description,
    price,
    category_id,
    image_url,
  }: ProductInput) {}
  async deleteProduct() {}
}

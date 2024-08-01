import { AddItemInput, CategoryInput } from "../dto/category-input";
import { categories, CategoryDoc } from "../models";

export class CategoryRepository {
  constructor() {}
  async createCategory({ name, parentId, imageUrl }: CategoryInput) {
    console.log("CategoryRepository createCategory");
    // create a new category
    const newCate = await categories.create({
      name,
      parentId,
      subCategories: [],
      products: [],
      imageUrl,
    });
    // check parent id exist
    if (parentId) {
      // update parent category with new sub category id
      const parentCate = (await categories.findById(parentId)) as CategoryDoc;

      parentCate.subCategories = [...parentCate.subCategories, newCate];
      await parentCate.save();
    }
    // return new created category

    return newCate;
  }
  async getAllCategories(offset = 0, perPage?: number) {
    console.log("CategoryRepository getAllCategories");
    const data = await categories
      .find({ parentId: null })
      .populate({
        path: "subCategories",
        model: "categories",
        populate: {
          path: "subCategories",
          model: "categories",
        },
      })
      .skip(offset)
      .limit(perPage ? perPage : 100);
    return data;
  }
  async getTopCategories(offset = 0, perPage?: number) {
    console.log("CategoryRepository getTopCategories");
    const data = await categories
      .find({ parentId: { $ne: null } }, { products: { $slice: 10 } })
      .populate({
        path: "products",
        model: "products",
      })
      .sort({ displayOrder: "descending" })
      .limit(10);
    return data;
  }
  async getCategoryById(id: string, offset = 0, perPage?: number) {
    return await categories
      .findById(id, { products: { $slice: [offset, perPage ? perPage : 100] } })
      .populate({
        path: "products",
        model: "products",
      });
  }
  async updateCategory({ id, name, displayOrder, imageUrl }: CategoryInput) {
    let existingCategory = (await categories.findById(id)) as CategoryDoc;
    if (existingCategory) {
      existingCategory.name = name;
      existingCategory.displayOrder = displayOrder;
      existingCategory.imageUrl = imageUrl;
      return existingCategory.save();
    }
    throw new Error("product not exist");
  }
  async deleteCategory(id: string) {
    return categories.deleteOne({ id });
  }
  async addItem({ id, products }: AddItemInput) {
    const category = (await categories.findById(id)) as CategoryDoc;
    if (category) {
      category.products = [...category.products, ...products];
      return await category.save();
    }
    throw new Error("category not found");
  }
  async removeItem({ id, products }: AddItemInput) {
    const category = (await categories.findById(id)) as CategoryDoc;
    if (category) {
      const excludeProducts = category.products.filter(
        (item) => !products.includes(item)
      );
      category.products = excludeProducts;
      return await category.save();
    }
    throw new Error("category not found");
  }
}

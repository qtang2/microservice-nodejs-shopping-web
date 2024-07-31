import { CategoryInput } from "../dto/category-input";
import { categories, CategoryDoc } from "../models/category-model";

export class CategoryRepository {
  constructor() {}
  async createCategory({ name, parentId }: CategoryInput) {
    console.log("CategoryRepository createCategory");
    // create a new category
    const newCate = await categories.create({
      name,
      parentId,
      subCategories: [],
      products: [],
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
  async getCategoryById(id: string, offset = 0, perPage?: number) {
    return categories
      .findById(id, { $slice: [offset, perPage ? perPage : 100] })
      .populate({
        path: "products",
        model: "products",
      });
  }
  async updateCategory({ id, name, displayOrder }: CategoryInput) {
    let existingCategory = (await categories.findById(id)) as CategoryDoc;
    if (existingCategory) {
      existingCategory.name = name;
      existingCategory.displayOrder = displayOrder;
      return existingCategory.save();
    }
    throw new Error("product not exist");
  }
  async deleteCategory(id: string) {
    return categories.deleteOne({ id });
  }
}

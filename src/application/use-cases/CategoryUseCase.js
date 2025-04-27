import { CategoryRepository } from '../../infrastructure/repositories/CategoryRepository.js'; 
import { CategoryDTO } from '../DTOs/CategoryDTO.js';

export class CategoryUseCase {
  static async getAllCategories() {
    const categoryRepository = new CategoryRepository();
    const categories = await categoryRepository.getAll();
    return categories.map(category => 
        new CategoryDTO(category.name, category.idCategory, category.icon, category.isDefault));
  }

  static async getCategoryById(id) {
    const categoryRepository = new CategoryRepository();
    const category = await categoryRepository.getById(id);
    return new CategoryDTO(category.name, category.idCategory, category.icon, category.isDefault);
  }

  static async getCategoryByName(name) {
    const categoryRepository = new CategoryRepository();
    const categoriesByName = await categoryRepository.getByName(name);
    return categoriesByName.map(category => 
      new CategoryDTO(category.name, category.idCategory, category.icon, category.isDefault));
  }

  static async getDefaultCategory() {
    const categoryRepository = new CategoryRepository();
    const defaultCategory = await categoryRepository.getDefault();
    return defaultCategory.map(category => new CategoryDTO(category.name, category.idCategory, category.icon, category.isDefault));
  }

  static async createCategory(name, isActive, isDefault) {
    const categoryRepository = new CategoryRepository();
    const newCategory = { name, isActive, isDefault };
    return await categoryRepository.create(newCategory);
  }

  static async updateCategory(id, name, isActive, isDefault) {
    const categoryRepository = new CategoryRepository();
    const updatedCategory = { name, isActive, isDefault };
    return await categoryRepository.update(id, updatedCategory);
  }

  static async deleteCategory(id) {
    const categoryRepository = new CategoryRepository();
    return await categoryRepository.delete(id);
  }
}

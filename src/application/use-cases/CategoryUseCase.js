import { CategoryRepository } from '../../infrastructure/repositories/CategoryRepository.js'; // Repositorio de categorías

export class CategoryUseCase {
  static async getAllCategories() {
    const categoryRepository = new CategoryRepository();
    return await categoryRepository.getAll();
  }

  static async getCategoryById(id) {
    const categoryRepository = new CategoryRepository();
    return await categoryRepository.getById(id);
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
  static async getCategoryByName(name) {
    const categoryRepository = new CategoryRepository();
    return await categoryRepository.getByName(name);
  }
  static async getDefaultCategory() {
    const categoryRepository = new CategoryRepository();
    return await categoryRepository.getDefault();
  }
}

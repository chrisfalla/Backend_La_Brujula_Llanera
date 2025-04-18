import { CategoryRepositoryImpl } from '../../infrastructure/repositories/CategoryRepositoryImpl.js'; // Repositorio de categorías

export class CategoryUseCase {
  static async getAllCategories() {
    const categoryRepository = new CategoryRepositoryImpl();
    return await categoryRepository.getAll();
  }

  static async getCategoryById(id) {
    const categoryRepository = new CategoryRepositoryImpl();
    return await categoryRepository.getById(id);
  }

  static async createCategory(name, isActive) {
    const categoryRepository = new CategoryRepositoryImpl();
    const newCategory = { name, isActive };
    return await categoryRepository.create(newCategory);
  }

  static async updateCategory(id, name, isActive) {
    const categoryRepository = new CategoryRepositoryImpl();
    const updatedCategory = { name, isActive };
    return await categoryRepository.update(id, updatedCategory);
  }

  static async deleteCategory(id) {
    const categoryRepository = new CategoryRepositoryImpl();
    return await categoryRepository.delete(id);
  }
}

import CategoryDTO from '../DTOs/CategoryDTO.js';
export default class CategoryUseCase {
  constructor(categoryRepository) {
    this.categoryRepository = categoryRepository;
  }
  async getAllCategories() {
    const categories = await this.categoryRepository.getAll();
    return categories.map(category => 
        new CategoryDTO(category.name, category.idCategory, category.icon, category.isDefault));
  }

  async getCategoryById(id) {
    const category = await this.categoryRepository.getById(id);
    return new CategoryDTO(category.name, category.idCategory, category.icon, category.isDefault);
  }

  async getCategoryByName(name) {
    const categoriesByName = await this.categoryRepository.getByName(name);
    return categoriesByName.map(category => 
      new CategoryDTO(category.name, category.idCategory, category.icon, category.isDefault));
  }

  async getDefaultCategory() {
    const defaultCategory = await this.categoryRepository.getDefault();
    return defaultCategory.map(category => new CategoryDTO(category.name, category.idCategory, category.icon, category.isDefault));
  }

  async createCategory(name, isActive, isDefault) {
    const newCategory = { name, isActive, isDefault };
    return await this.categoryRepository.create(newCategory);
  }

  async updateCategory(id, name, isActive, isDefault) {
    const updatedCategory = { name, isActive, isDefault };
    return await this.categoryRepository.update(id, updatedCategory);
  }

  async deleteCategory(id) {
    return await this.categoryRepository.delete(id);
  }
}

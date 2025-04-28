import ICategoryRepository from '../../domain/repositories/ICategoryRepository.js';
import Category from '../../domain/entities/Category.js';

export default class CategoryRepository extends ICategoryRepository {
  constructor(CategoryModel) {
    super();
    this.CategoryModel = CategoryModel;
  }
  async getAll() {
    const records = await this.CategoryModel.findAll();
    return records.map(record => new Category(record.dataValues));
  }

  async getById(id) {
    const record = await this.CategoryModel.findByPk(id);
    return record ? new Category(record.dataValues) : null;
  }

  async create(category) {
    const created = await this.CategoryModel.create({
      name: category.name,
      isActive: category.isActive,
      isDefault: category.isDefault,
    });
    return new Category(created.dataValues);
  }

  async update(id, category) {
    const [updated] = await this.CategoryModel.update({
      name: category.name,
      isActive: category.isActive,
      isDefault: category.isDefault,
    }, {
      where: { idCategory: id },
    });
    return updated > 0;
  }

  async delete(id) {
    const deleted = await this.CategoryModel.destroy({
      where: { idCategory: id },
    });
    return deleted > 0;
  }
  async getDefault() {
    const records = await this.CategoryModel.findAll({
      where: { isDefault: true },
    });
    return records.map(record => new Category(record.dataValues));
  }
  
}

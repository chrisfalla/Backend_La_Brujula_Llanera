import { ICategoryRepository } from '../../domain/repositories/ICategoryRepository.js';
import { CategoryModel } from '../models/CategoryModel.js';
import { Category } from '../../domain/entities/Category.js';


export class CategoryRepository extends ICategoryRepository {
  async getAll() {
    const records = await CategoryModel.findAll();
    return records.map(record => new Category(record.dataValues));
  }

  async getById(id) {
    const record = await CategoryModel.findByPk(id);
    return record ? new Category(record.dataValues) : null;
  }

  async create(category) {
    const created = await CategoryModel.create({
      name: category.name,
      isActive: category.isActive,
      isDefault: category.isDefault,
    });
    return new Category(created.dataValues);
  }

  async update(id, category) {
    const [updated] = await CategoryModel.update({
      name: category.name,
      isActive: category.isActive,
      isDefault: category.isDefault,
    }, {
      where: { idCategory: id },
    });
    return updated > 0;
  }

  async delete(id) {
    const deleted = await CategoryModel.destroy({
      where: { idCategory: id },
    });
    return deleted > 0;
  }
  async getDefault() {
    console.log('Buscando categorías con isDefault: true');
    const records = await CategoryModel.findAll({
      where: { isDefault: true },
    });
    console.log(records);  // Para ver el contenido exacto de los registros
    return records.map(record => new Category(record.dataValues));
  }
  
}

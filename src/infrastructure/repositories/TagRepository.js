import { TagModel } from '../models/TagModel.js';
import { Tag } from '../../domain/entities/Tag.js';
import { ITagRepository } from '../../domain/repositories/ITagRepostory.js';


export class TagRepository extends ITagRepository {
  async getAll() {
    const records = await TagModel.findAll();
    return records.map(record => new Tag(record.dataValues));
  }

  async getById(id) {
    const record = await TagModel.findByPk(id);
    return record ? new Tag(record.dataValues) : null;
  }

  async create(tag) {
    const created = await TagModel.create({
      name: tag.name,
    });
    return new Tag(created.dataValues);
  }

  async update(id, tag) {
    const [updated] = await TagModel.update({
      name: tag.name,
    }, {
      where: { idTag: id },
    });
    return updated > 0;
  }

  async delete(id) {
    const deleted = await TagModel.destroy({
      where: { idTag: id },
    });
    return deleted > 0;
  }
  async getDefault() {
    const records = await TagModel.findAll(
      { where: { isDefault: true } 
    });
    return records.map(record => new Tag(record.dataValues));
  }
  async getByIds(ids) {
    const records = await TagModel.findAll({
      where: {
        idTag: ids,
      },
    });
    return records.map(record => new Tag(record.dataValues));
  }
 
}

import Tag from '../../domain/entities/Tag.js';
import ITagRepository from '../../domain/repositories/ITagRepostory.js';


export default class TagRepository extends ITagRepository {
  constructor(tagModel){
    super();
    this.tagModel = tagModel;
  }

  async getAll() {
    const records = await this.tagModel.findAll();
    return records.map(record => new Tag(record.dataValues));
  }

  async getById(id) {
    const record = await this.tagModel.findByPk(id);
    return record ? new Tag(record.dataValues) : null;
  }

  async create(tag) {
    const created = await this.tagModel.create({
      name: tag.name,
    });
    return new Tag(created.dataValues);
  }

  async update(id, tag) {
    const [updated] = await this.tagModel.update({
      name: tag.name,
    }, {
      where: { idTag: id },
    });
    return updated > 0;
  }

  async delete(id) {
    const deleted = await this.tagModel.destroy({
      where: { idTag: id },
    });
    return deleted > 0;
  }
  async getDefault() {
    const records = await this.tagModel.findAll(
      { where: { isDefault: true } 
    });
    return records.map(record => new Tag(record.dataValues));
  }
  async getByIds(ids) {
    const records = await this.tagModel.findAll({
      where: {
        idTag: ids,
      },
    });
    return records.map(record => new Tag(record.dataValues));
  }
 
}

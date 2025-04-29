import ITagByPlaceRepository from '../../domain/repositories/ITagByPlaceRepository.js';

export default class TagByPlaceRepository extends ITagByPlaceRepository {
  constructor(tagByPlaceModel) {
    super();
    this.tagByPlaceModel = tagByPlaceModel;
  }
  async getPlacesByTagIds(tagIds) {
    const result = await this.tagByPlaceModel.findAll({ where: { idTagFk: tagIds } });
    return result.map(r => r.toJSON());
  }
}
import ITagByPlaceRepository from '../../domain/repositories/ITagByPlaceRepository.js';

export default class TagByPlaceRepository extends ITagByPlaceRepository {
  constructor(tagByPlaceModel) {
    super();
    this.tagByPlaceModel = tagByPlaceModel;
  }
  async getPlacesByTagId(idTag) {
    const result = await this.tagByPlaceModel.findAll({
      where: { idTagFk: idTag }
    });
    return result.map(r => r.toJSON());
  }
}
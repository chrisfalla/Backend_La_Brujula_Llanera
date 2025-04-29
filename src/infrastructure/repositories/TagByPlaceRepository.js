import { TagByPlaceModel } from '../models/TagByPlaceModel.js';
import { ITagByPlaceRepository } from '../../domain/repositories/ITagByPlaceRepository.js';


export class TagByPlaceRepository extends ITagByPlaceRepository {
  async getPlacesByTagIds(tagIds) {
    const result = await TagByPlaceModel.findAll({ where: { idTagFk: tagIds } });
    return result.map(r => r.toJSON());
  }
}
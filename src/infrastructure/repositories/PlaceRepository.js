import {IPlaceRepository} from '../../domain/repositories/IPlaceRepository.js'; 
import { PlaceModel } from '../models/PlaceModel.js';


export class PlaceRepository extends IPlaceRepository {
  async getPlacesByCategory(idCategory) {
    const result = await PlaceModel.findAll({ where: { idCategorie: idCategory } });
    return result.map(place => place.toJSON());
  }
}

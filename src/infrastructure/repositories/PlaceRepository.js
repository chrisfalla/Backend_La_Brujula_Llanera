import {IPlaceRepository} from '../../domain/repositories/IPlaceRepository.js'; 
import { PlaceModel } from '../models/PlaceModel.js';
import { Op } from 'sequelize';


export class PlaceRepository extends IPlaceRepository {
  async getPlacesByCategory(idCategory) {
    const result = await PlaceModel.findAll({ where: { idCategorie: idCategory } });
    return result.map(place => place.toJSON());
  }
  async getPlacesByIds(placeIds) {
    const result = await PlaceModel.findAll({
      where: {
        idPlace: {
          [Op.in]: placeIds
        }
      }
    });
    return result.map(place => place.toJSON());
  }
  
}

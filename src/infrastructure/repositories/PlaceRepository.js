import IPlaceRepository from '../../domain/repositories/IPlaceRepository.js'; 
import { Op } from 'sequelize';


export default class PlaceRepository extends IPlaceRepository {
  constructor(placeModel) {
    super();
    this.placeModel = placeModel;
  }
  async getPlacesByCategory(idCategory) {
    const result = await this.placeModel.findAll({ where: { idCategorie: idCategory } });
    return result.map(place => place.toJSON());
  }
  async getPlacesByIds(placeIds) {
    const result = await this.placeModel.findAll({
      where: {
        idPlace: {
          [Op.in]: placeIds
        }
      }
    });
    return result.map(place => place.toJSON());
  }
  async getPlaceById(idPlace) {
    const result = await this.placeModel.findByPk(idPlace);
    return result ? result.toJSON() : null;
  }
  async getPlaceByName(name) {
    const result = await this.placeModel.findOne({
      where: {
        name: {
          [Op.iLike]: `%${name}%`
        }
      }
    });
    return result ? result.toJSON() : null;
  }
}

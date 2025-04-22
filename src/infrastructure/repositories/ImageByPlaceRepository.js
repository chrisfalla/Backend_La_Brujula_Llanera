import { ImageByPlaceModel } from '../models/ImageByPlaceModel.js';

export class ImageByPlaceRepository {
  async getImagesByPlaceIds(placeIds) {
    const result = await ImageByPlaceModel.findAll({
      where: { idPlaceFk: placeIds },
      order: [['createdAt', 'ASC']], // primera imagen por orden de creación
    });
    return result.map(img => img.toJSON());
  }
}

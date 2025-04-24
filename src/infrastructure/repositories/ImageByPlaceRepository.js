import { ImageByPlaceModel } from '../models/ImageByPlaceModel.js';

export class ImageByPlaceRepository {
  async getImagesByPlaceIds(placeIds, idImageCategory) {
    const result = await ImageByPlaceModel.findAll({
      where: {
        idPlaceFk: placeIds,
        idImageCategorieFk: idImageCategory
      },
      order: [['createdAt', 'ASC']]
    });

    return result.map(img => img.toJSON());
  }
}

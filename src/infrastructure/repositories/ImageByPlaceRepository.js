import IImageByPlaceRepository from "../../domain/repositories/IImageByPlaceRepository.js";

export default class ImageByPlaceRepository extends IImageByPlaceRepository {
  constructor(imageByPlaceModel) {
    super();
    this.imageByPlaceModel = imageByPlaceModel;
  }
  async getImagesByPlaceIds(placeIds, idImageCategory) {
    const result = await this.imageByPlaceModel.findAll({
      where: {
        idPlaceFk: placeIds,
        idImageCategorieFk: idImageCategory
      },
      order: [['createdAt', 'ASC']]
    });

    return result.map(img => img.toJSON());
  }
  async getImageByPlaceId(placeId, idImageCategory){
    const result = await this.imageByPlaceModel.findOne({
      where: {
        idPlaceFk: placeId,
        idImageCategorieFk: idImageCategory
      },
      order: [['createdAt', 'ASC']]
    });

    return result ? result.toJSON() : null;
  }
  async getImagesByPlaceId(placeId, idImageCategory){
    const result = await this.imageByPlaceModel.findAll({
      where: {
        idPlaceFk: placeId,
        idImageCategorieFk: idImageCategory
      },
      order: [['createdAt', 'ASC']]
    });

    return result.map(img => img.toJSON());
  }
}

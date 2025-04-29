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
}

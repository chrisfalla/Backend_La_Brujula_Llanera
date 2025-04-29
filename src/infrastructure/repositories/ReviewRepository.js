import IReviewRepository from "../../domain/repositories/IReviewRepository.js";

export default class ReviewRepository extends IReviewRepository {
  constructor(reviewModel) {
    super();
    this.reviewModel = reviewModel;
  }
  async getReviewsByPlaceIds(placeIds) {
    const result = await this.reviewModel.findAll({ where: { idPlaceFk: placeIds } });
    return result.map(r => r.toJSON());
  }
}

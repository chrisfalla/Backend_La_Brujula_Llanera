import IReviewRepository from "../../domain/repositories/IReviewRepository.js";
import { fn, col } from 'sequelize'; 

export default class ReviewRepository extends IReviewRepository {
  constructor(reviewModel) {
    super();
    this.reviewModel = reviewModel;
  }
  async getReviewsByPlaceIds(placeIds) {
    const result = await this.reviewModel.findAll({ where: { idPlaceFk: placeIds } });
    return result.map(r => r.toJSON());
  }
  async getPlaceRatingById(placeId) {
    const result = await this.reviewModel.findOne({
        where: { idPlaceFk: placeId },
        attributes: [[fn('AVG', col('ratingValue')), 'averageRating']]
    });

    return result ? result.toJSON() : null;
}
}

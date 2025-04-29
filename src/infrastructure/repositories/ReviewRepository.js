import { IReviewRepository } from "../../domain/repositories/IReviewRepository.js";
import { ReviewModel } from "../models/ReviewModel.js";

export class ReviewRepository extends IReviewRepository {
  async getReviewsByPlaceIds(placeIds) {
    const result = await ReviewModel.findAll({ where: { idPlaceFk: placeIds } });
    return result.map(r => r.toJSON());
  }
}

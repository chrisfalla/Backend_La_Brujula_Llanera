export default class IReviewRepository {
    async getReviewsByPlaceIds(placeIds) { throw new Error("Method not implemented."); }
    async getPlaceRatingById(idPlace){ throw new Error("Method not implemented."); }
    async getReviewsByPlaceId(idPlace){ throw new Error("Method not implemented."); }
    async addCommentByPlace(userId, placeId, comment, ratingValue){ throw new Error("Method not implemented."); }
    async getReviewByUserId(userId, placeId){ throw new Error("Method not implemented."); }
    async updateCommentByPlace(userId, placeId, comment, ratingValue){ throw new Error("Method not implemented."); }
}
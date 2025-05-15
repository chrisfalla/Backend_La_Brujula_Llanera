export default class ReviewController {
    constructor(getReviewsByPlaceUseCase) {
        this.getReviewsByPlaceUseCase = getReviewsByPlaceUseCase;
    }

    async getReviewsByPlaceId(req, res) {
        try {
            const { placeId } = req.params;
            if (!placeId) {
                return res.status(400).json({ message: "Missing placeId parameter" });
            }
            const reviews = await this.getReviewsByPlaceUseCase.getReviews(placeId);
            if (!reviews || reviews.length === 0) {
                return res.status(404).json({ message: "No reviews found" });
            }
            return res.status(200).json(reviews);
        } catch (error) {
            console.error("Error fetching reviews:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
}

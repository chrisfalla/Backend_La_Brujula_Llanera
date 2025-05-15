import { Router } from 'express';

/**
 * @swagger
 * tags:
 *   name: Review Details
 *   description: Here you gonna see all the info about reviews
 */

class ReviewRoute {
    constructor(reviewController) {
        this.router = Router();
        this.reviewController = reviewController;
        this.initializeRoutes();

    }
    initializeRoutes() {
        this.getReviewsByPlaceId();
    }
    getReviewsByPlaceId() {
        /**
         * @swagger
         * /review/{placeId}:
         *   get:
         *     summary: Get reviews by place ID
         *     tags: [Review Details]
         *     parameters:
         *       - in: path
         *         name: placeId
         *         required: true
         *         description: The ID of the place to get reviews for
         *         schema:
         *           type: integer
         *     responses:
         *       200:
         *         description: A list of reviews for the specified place
         */
        this.router.get('/:placeId', (req, res) => this.reviewController.getReviewsByPlaceId(req, res));
    }
    getRouter() {
        return this.router;
    }
}
export default ReviewRoute;
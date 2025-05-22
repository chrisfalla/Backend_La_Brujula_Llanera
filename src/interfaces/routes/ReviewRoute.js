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
        this.addCommentByPlace();
    }
    addCommentByPlace(){
        /**
         * @swagger
         * /review:
         *   post:
         *     summary: Add a comment by place
         *     tags: [Review Details]
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *               comment:
         *                 type: string
         *               ratingValue:
         *                 type: integer
         *               userId:
         *                 type: integer
         *               placeId:
         *                 type: integer
         *     responses:
         *       201:
         *         description: Comment added successfully
         */
        this.router.post('/', (req, res) => this.reviewController.addCommentByPlace(req, res));
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
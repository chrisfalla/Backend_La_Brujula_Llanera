import { Router } from 'express';

/**
 * @swagger
 * tags:
 *   name: Place Details
 *   description: Operations related to Place Details
 */

export default class PlaceDetailRoute {
    constructor(placeDetailsController) {
        this.router = Router();
        this.placeDetailsController = placeDetailsController;
        this.initializeRoutes();
    }
    
    initializeRoutes() {
        this.getPlaceDetails();
    }
    
    getPlaceDetails() {
        /**
         * @swagger
         * /placeDetail/{idPlace}:
         *   get:
         *     summary: Get Place Details
         *     tags: [Place Details]
         *     parameters:
         *       - name: idPlace
         *         in: path
         *         required: true
         *         description: ID of the place to retrieve details for
         *         schema:
         *           type: string
         *     responses:
         *       200:
         *         description: Place details retrieved successfully
         *       404:
         *         description: Place not found
         *       500:
         *         description: Internal server error
         */
        this.router.get('/:idPlace', (req, res) => this.placeDetailsController.getPlaceDetails(req, res));
    }
    getRouter() {
        return this.router;
    }
}
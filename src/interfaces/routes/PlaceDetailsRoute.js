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
        this.getPlacesByCategory();
        this.getPlacesByName();
    }
    getPlacesByName() {
        /**
         * @swagger
         * /placeDetail/placesByName/{name}:
         *   get:
         *     summary: Get Places by Name
         *     tags: [Place Details]
         *     parameters:
         *       - name: name
         *         in: path
         *         required: true
         *         description: Name of the place to search for
         *         schema:
         *           type: string
         *     responses:
         *       200:
         *         description: Places retrieved successfully
         *       404:
         *         description: No places found with this name
         *       500:
         *         description: Internal server error
         */
        this.router.get('/placesByName/:name', (req, res) =>
            this.placeDetailsController.getPlacesByName(req, res)
        );
    }

    getPlacesByCategory() {
        /**
         * @swagger
         * /placeDetail/placesByCategory/{idCategory}:
         *   get:
         *     summary: Get Places by Category
         *     tags: [Place Details]
         *     parameters:
         *       - name: idCategory
         *         in: path
         *         required: true
         *         description: ID of the category to retrieve places for
         *         schema:
         *           type: string
         *     responses:
         *       200:
         *         description: Places retrieved successfully
         *       404:
         *         description: No places found for this category
         *       500:
         *         description: Internal server error
         */
        this.router.get('/placesByCategory/:idCategory', (req, res) =>
            this.placeDetailsController.getPlacesByCategory(req, res)
        );
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
        this.router.get('/:idPlace', (req, res) =>
            this.placeDetailsController.getPlaceDetails(req, res)
        );
    }

    getRouter() {
        return this.router;
    }
}

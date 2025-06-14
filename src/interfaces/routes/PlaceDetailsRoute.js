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
        this.addPlace();
        this.postAddressByPlace();
        this.addTagsByPlace();
    }
    addTagsByPlace() {
        /**
         * @swagger
         * /placeDetail/addTags/{placeId}:
         *   post:
         *     summary: Add Tags to a Place
         *     tags: [Place Details]
         *     parameters:
         *       - in: path
         *         name: placeId
         *         required: true
         *         schema:
         *           type: string
         *         description: ID of the Place
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *               tagNames:
         *                 type: array
         *                 items:
         *                   type: string
         *                 description: List of Tag names to be added to the Place
         *     responses:
         *       200:
         *         description: Tags added successfully to the Place
         *       404:
         *         description: Place or Tags not found
         *       500:
         *         description: Server error
         */
        this.router.post('/addTags/:placeId', (req, res) =>
            this.placeDetailsController.AddTagsByPlace(req, res)
        );
    }
    addPlace() {
        /**
         * @swagger
         * /placeDetail:
         *   post:
         *     summary: Add a new Place
         *     tags: [Place Details]
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *               name:
         *                 type: string
         *               description:
         *                 type: string
         *               nameCategory:
         *                 type: string
         *     responses:
         *       201:
         *         description: Place added successfully
         *       500:
         *         description: Internal server error
         */
        this.router.post('/', (req, res) =>
            this.placeDetailsController.addPlace(req, res)
        );
    }
    postAddressByPlace() {
        /**
         * @swagger
         * /placeDetail/postAddressByPlace:
         *   post:
         *     summary: Post Address by Place
         *     tags: [Place Details]
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *               idPlace:
         *                 type: string
         *               description:
         *                 type: string
         *     responses:
         *       200:
         *         description: Address posted successfully
         *       500:
         *         description: Internal server error
         */
        this.router.post('/postAddressByPlace', (req, res) =>
            this.placeDetailsController.postAddressByPlace(req, res)
        );
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

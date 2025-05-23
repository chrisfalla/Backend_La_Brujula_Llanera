import { Router } from 'express';

/**
 * @swagger
 * tags:
 *   name: Log
 *   description: Get all the EndPoints for Logs
 */

export default class LogRoute {
    constructor(logVisitController) {
        this.router = Router(); 
        this.logVisitController = logVisitController;
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.addLogVisit();
    }

    addLogVisit() {
        /**
         * @swagger
         * /log:
         *   post:
         *     summary: Add a log visit
         *     tags: [Log]
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *               idDeviceInfoFk:
         *                 type: string
         *               idPlaceFk:
         *                 type: string
         *               idUserFk:
         *                 type: string
         *             required:
         *               - idDeviceInfoFk
         *               - idPlaceFk
         *               - idUserFk
         *     responses:
         *       200:
         *         description: Log visit added successfully
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 message:
         *                   type: string
         *                   example: Log visit registered
         *       400:
         *         description: Bad request – Invalid input
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 error:
         *                   type: string
         *                   example: Missing required fields
         *       500:
         *         description: Internal server error
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 error:
         *                   type: string
         *                   example: Server failed to process request
         */
        this.router.post('/', (req, res) => this.logVisitController.addLogVisit(req, res));
    }

    getRouter() {
        return this.router;
    } 
}

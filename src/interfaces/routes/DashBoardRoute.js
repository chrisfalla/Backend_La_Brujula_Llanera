import { Router } from 'express';

/**
* @swagger
* tags:
*   name: Dashboard
*   description: Operations related to Dashboard
*/

class DashBoardRoute {
  constructor(DashBoardController) {
    this.router = Router();
    this.DashBoardController = DashBoardController; // guardamos la referencia correcta
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.createDashBoard();
  }

  createDashBoard() {
    /**
     * @swagger
     * /dashboard/createDashBoard:
     *   post:
     *     summary: Create a new dashboard entry
     *     tags: [Dashboard]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               place:
     *                 type: object
     *                 properties:
     *                   name:
     *                     type: string
     *                     description: Name of the place
     *                   description:
     *                     type: string
     *                     description: Short description of the place
     *                   category:
     *                     type: string
     *                     description: Category of the place (e.g., Restaurant)
     *               images:
     *                 type: object
     *                 properties:
     *                   mostVisited:
     *                     type: string
     *                   smallCard:
     *                     type: string
     *                   profileDetail:
     *                     type: string
     *                   gallery:
     *                     type: array
     *                     items:
     *                       type: string
     *                   logo:
     *                     type: string
     *               socialMedia:
     *                 type: object
     *                 properties:
     *                   phone:
     *                     type: string
     *                   whatsApp:
     *                     type: string
     *                   email:
     *                     type: string
     *                   instagram:
     *                     type: string
     *               tags:
     *                 type: array
     *                 items:
     *                   type: string
     *                 description: List of tags related to the place
     *               address:
     *                 type: string
     *                 description: Physical address of the place
     *     responses:
     *       201:
     *         description: Dashboard entry created successfully
     *       500:
     *         description: Error while creating the dashboard entry
     */
    this.router.post('/createDashBoard', (req, res) =>
      this.DashBoardController.createDashBoard(req, res) // usamos el nombre correcto
    );
  }

  getRouter() {
    return this.router;
  }
}

export default DashBoardRoute;

import { Router } from 'express';

/**
* @swagger
* tags:
*   name: Favorites
*   description: Operations related to favorites
*/

class FavoriteRoute {
  constructor(favoriteController) {
    this.router = Router();
    this.favoriteController = favoriteController;
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.createFavorite();
    this.deleteFavorite();
    this.getFavorites();
  }

  createFavorite(){
    /**
     * @swagger
     * /favorites:
     *   post:
     *     summary: Create a new favorite
     *     tags: [Favorites]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               idUserFk:
     *                 type: integer
     *                 description: ID of the user
     *               idPlaceFk:
     *                 type: integer
     *                 description: ID of the place
     *     responses:
     *       201:
     *         description: Favorite created successfully
     *       500:
     *         description: Error while creating the favorite
     */
    this.router.post('/', (req, res) => this.favoriteController.createFavorite(req, res));
  }
  deleteFavorite(){
    /**
     * @swagger
     * /favorites/{idUserFk}/{idPlaceFk}:
     *   delete:
     *     summary: Delete a favorite by user and place
     *     tags: [Favorites]
     *     parameters:
     *       - in: path
     *         name: idUserFk
     *         required: true
     *         description: ID of the user
     *       - in: path
     *         name: idPlaceFk
     *         required: true
     *         description: ID of the place
     *     responses:
     *       204:
     *         description: Favorite deleted successfully
     *       500:
     *         description: Error while deleting the favorite
     */
    this.router.delete('/:idUserFk/:idPlaceFk', (req, res) => this.favoriteController.deleteFavorite(req, res));
  }
  getFavorites(){
    /**
     * @swagger
     * /favorites/{idUserFk}:
     *   get:
     *     summary: Get favorites by user ID
     *     tags: [Favorites]
     *     parameters:
     *       - in: path
     *         name: idUserFk
     *         required: true
     *         description: ID of the user
     *     responses:
     *       200:
     *         description: List of favorites for the user
     *       404:
     *         description: No favorites found for this user
     *       500:
     *         description: Error while retrieving favorites
     */
    this.router.get('/:idUserFk', (req, res) => this.favoriteController.getFavoritesByUserId(req, res));
  }

  getRouter() {
    return this.router; // Retornamos el router con las rutas ya configuradas
  }
}

export default FavoriteRoute;

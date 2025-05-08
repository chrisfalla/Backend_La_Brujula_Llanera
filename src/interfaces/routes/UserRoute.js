import { Router } from 'express';
/**
 * @swagger
 * tags:
 *   name: User
 *   description: Here I gonna test If everythin is ok
 */

class UserRoute {
  constructor(userController) {
    this.router = Router();
    this.userController = userController;
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.loginUser();
  }
  loginUser(){
    /**
     * @swagger
     * /user/login:
     *   post:
     *     summary: Login user
     *     tags: [User]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               email:
     *                 type: string
     *               password:
     *                 type: string
     *             required:
     *               - email
     *               - password
     *     responses:
     *       200:
     *         description: Login successful
     *       401:
     *         description: Invalid email or password
     */
    this.router.post('/login', (req, res) => this.userController.loginUser(req, res));
  }
  
  getRouter() {
    return this.router;
  }
}

export default UserRoute;

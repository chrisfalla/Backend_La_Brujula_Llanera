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
    this.registerUser();
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
  registerUser(){
    /**
     * @swagger
     * /user/register:
     *   post:
     *     summary: Register user
     *     tags: [User]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               names:
     *                 type: string
     *               email:
     *                 type: string
     *               idGender:
     *                 type: integer
     *               phone:
     *                 type: string
     *               birthday:
     *                 type: string
     *                 format: date
     *               avatar:
     *                 type: integer
     *               password:
     *                 type: string
     *             required:
     *               - names
     *               - email
     *               - idGender
     *               - phone
     *               - birthday
     *               - avatar
     *               - password
     *     responses:
     *       200:
     *         description: User registered successfully
     *       400:
     *         description: Bad Request - Invalid data provided
     *       500:
     *         description: Internal server error
    */
    this.router.post('/register', (req, res) => this.userController.registerUser(req, res));
  }
  getRouter() {
    return this.router;
  }
}

export default UserRoute;

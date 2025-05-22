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
    this.forgotPassword();
    this.updateUserInfo();
  }
  updateUserInfo(){
    /**
     * @swagger
     * /user/update:
     *   post:
     *     summary: Update user information
     *     tags: [User]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               idUser:
     *                 type: integer
     *               names:
     *                 type: string
     *               email:
     *                 type: string
     *               phone:
     *                 type: string
     *             required:
     *               - idUser
     *               - names
     *               - email
     *               - phone
     *     responses:
     *       200:
     *         description: User information updated successfully
    */
    this.router.post('/update', (req, res) => this.userController.updateUserInfo(req, res));
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
  forgotPassword(){
    /**
     * @swagger
     * /user/forgot-password:
     *   post:
     *     summary: Forgot password
     *     tags: [User]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               idUser:
     *                 type: integer
     *               newPassword:
     *                 type: string
     *             required:
     *               - idUser
     *               - newPassword
     *     responses:
     *       200:
     *         description: Password updated successfully
     *       404:
     *         description: User not found
    */
    this.router.post('/forgot-password', (req, res) => this.userController.forgotPassword(req, res));
  }

  getRouter() {
    return this.router;
  }
}

export default UserRoute;

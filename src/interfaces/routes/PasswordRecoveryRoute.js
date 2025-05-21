import express from 'express';

/**
 * @swagger
 * tags:
 *   name: PasswordRecovery
 *   description: Get all the EndPoints for Password Recovery
 */
class PasswordRecoveryRoute{
    constructor(passwordRecoveryController){
        this.router = express.Router();
        this.passwordRecoveryController = passwordRecoveryController;
        this.initializeRoutes();
    }
    initializeRoutes(){
        this.generateCode();
        this.validateCode();
    }
    getRouter() {
        return this.router;
    }
    validateCode() {
        /**
         * @swagger
         * /recovery/validate:
         *   post:
         *     summary: Validates a recovery code associated with a user's email
         *     tags: [PasswordRecovery]
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             required:
         *               - email
         *               - code
         *             properties:
         *               email:
         *                 type: string
         *                 format: email
         *                 example: usuario@example.com
         *               code:
         *                 type: string
         *                 example: 123456
         *     responses:
         *       200:
         *         description: Code validated successfully
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 success:
         *                   type: boolean
         *                   example: true
         *                 message:
         *                   type: string
         *                   example: Code is valid
         *       400:
         *         description: Invalid code or already used
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 message:
         *                   type: string
         *                   example: Invalid code
         *       500:
         *         description: Internal Server Error
         */
        this.router.post('/validate', this.passwordRecoveryController.validateCode.bind(this.passwordRecoveryController));
    }
    
    generateCode() {
        /**
         * @swagger
         * /recovery/code:
         *   post:
         *     summary: Verify if the system generates a new code or return the same one
         *     tags: [PasswordRecovery]
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             required:
         *               - email
         *             properties:
         *               email:
         *                 type: string
         *                 format: email
         *                 example: usuario@example.com
         *     responses:
         *       200:
         *         description: Code Used or Generated Succesfully
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 message:
         *                   type: string
         *                 code:
         *                   type: integer
         *       400:
         *         description: Email not found
         *       500:
         *         description: Internal Server Error
         */
        this.router.post('/code', this.passwordRecoveryController.validateEmail.bind(this.passwordRecoveryController));
    }   
}

export default PasswordRecoveryRoute;
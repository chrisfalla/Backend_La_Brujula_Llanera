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
    }
    getRouter() {
        return this.router;
    }
    generateCode() {
        /**
         * @swagger
         * /recovery/code:
         *   post:
         *     summary: Verifica si el código de recuperación sigue vigente o genera uno nuevo
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
         *         description: Código vigente o generado exitosamente
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
         *         description: Email no encontrado
         *       500:
         *         description: Error interno del servidor
         */
        this.router.post('/code', this.passwordRecoveryController.validateEmail.bind(this.passwordRecoveryController));
    }    
}

export default PasswordRecoveryRoute;
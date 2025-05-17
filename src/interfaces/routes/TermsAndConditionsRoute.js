import { Router } from 'express';

/**
 * @swagger
 * tags:
 *   name: Terms and Conditions
 *   description: Endpoint para obtener la URL de los términos y condiciones
 */

class TermsAndConditionsRoute {
    constructor(termsAndConditionsController) {
        this.router = Router();
        this.termsAndConditionsController = termsAndConditionsController;
        this.initializeRoutes();
    }
    
    initializeRoutes() {
        this.getTermsAndConditionsUrl();
    }
    
    getTermsAndConditionsUrl() {
        /**
         * @swagger
         * /terms-and-conditions:
         *   get:
         *     summary: Obtener URL de términos y condiciones
         *     tags: [Terms and Conditions]
         *     responses:
         *       200:
         *         description: URL obtenida con éxito
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 url:
         *                   type: string
         *                   description: URL de los términos y condiciones
         *                   example: https://chrisfalla.github.io/Termns-and-Conditions/
         *                 message:
         *                   type: string
         *                   description: Mensaje de confirmación
         *                   example: URL de términos y condiciones obtenida con éxito
         *       500:
         *         description: Error del servidor
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 message:
         *                   type: string
         *                   example: Error al obtener URL de términos y condiciones
         */
        this.router.get('/', (req, res) => this.termsAndConditionsController.getTermsAndConditionsUrl(req, res));
    }
    
    getRouter() {
        return this.router;
    }
}

export default TermsAndConditionsRoute;

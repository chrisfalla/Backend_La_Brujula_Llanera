
export default class TermsAndConditionsController {
    constructor() {
        // No necesitamos inyección de dependencias aquí ya que solo retornamos una URL estática
    }

    /**
     * Obtiene la URL de los términos y condiciones
     * @param {*} req - Request object
     * @param {*} res - Response object
     * @returns {Object} - Objeto con la URL de los términos y condiciones
     */
    getTermsAndConditionsUrl(req, res) {
        try {
            // URL estática de los términos y condiciones
            const termsAndConditionsUrl = "https://chrisfalla.github.io/Termns-and-Conditions/";
            
            return res.status(200).json({
                url: termsAndConditionsUrl,
                message: "URL de términos y condiciones obtenida con éxito"
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Error al obtener URL de términos y condiciones" });
        }
    }
}

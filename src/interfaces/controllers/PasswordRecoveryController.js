export default class PasswordRecoveryController{
    constructor(passwordRecoveryUseCase, ValidateCodeUseCase){
        this.passwordRecoveryUseCase = passwordRecoveryUseCase;
        this.validateCodeUseCase = ValidateCodeUseCase;
    }

    async validateEmail(req, res){
        const { email } = req.body;
        try {
            const response = await this.passwordRecoveryUseCase.validateEmail(email);
            return res.status(200).json(response);
        } catch (error) {
            console.error("Error validating email:", error);
            return res.status(400).json({ message: error.message });
        }
    }
    async validateCode(req, res){
        const { email, code } = req.body;
        try {
            const response = await this.validateCodeUseCase.validateCode(email, code);
            return res.status(200).json(response);
        } catch (error) {
            console.error("Error validating code:", error);
            return res.status(400).json({ message: error.message });
        }
    }
}
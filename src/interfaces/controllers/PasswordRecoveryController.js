export default class PasswordRecoveryController{
    constructor(passwordRecoveryUseCase){
        this.passwordRecoveryUseCase = passwordRecoveryUseCase;
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
}
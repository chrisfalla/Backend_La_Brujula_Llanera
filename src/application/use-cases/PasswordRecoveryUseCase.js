export default class PasswordRecoveryUseCase {
    constructor(passwordRecoveryRepository, userRepository) {
        this.passwordRecoveryRepository = passwordRecoveryRepository;
        this.userRepository = userRepository;
    }

    async validateEmail(email) {
        const user = await this.userRepository.getUserByEmail(email);
        if (!user) {
            throw new Error("Email not found");
        }

        const existingCode = await this.passwordRecoveryRepository.validateExpirationCode(user.idUser);

        if (existingCode) {
            return { message: "El código sigue vigente", code: existingCode.codeValue };
        } else {
            const updatedCode = await this.passwordRecoveryRepository.updateVerificationCode(user.idUser);
            return { message: "Código actualizado", code: updatedCode.codeValue };
        }
    }
}

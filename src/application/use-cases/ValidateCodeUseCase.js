export default class ValidateCodeUseCase {
    constructor(passwordRecoveryRepository, userRepository) {
        this.passwordRecoveryRepository = passwordRecoveryRepository;
        this.userRepository = userRepository;
    }

    async validateCode(email, code) {
        const user = await this.userRepository.getUserByEmail(email);
        const userId = user.idUser;

        const codeRecovery = await this.passwordRecoveryRepository.getCodeByUser(userId);

        if (!codeRecovery) {
            throw new Error('No code found for this user');
        }

        const now = new Date();
        const isExpired = codeRecovery.expiresAt < now;
        const isUsed = codeRecovery.isUsed;
        const isValidCode = codeRecovery.codeValue === code;

        if (isExpired || isUsed) {
            throw new Error('Code expired or already used');
        }
        if (!isValidCode) {
            await codeRecovery.increment('attempts', { by: 1 });
            throw new Error('Invalid code');
        }
        if (codeRecovery.attempts >= 3) {
            throw new Error('Maximum attempts reached');
        }

        this.passwordRecoveryRepository.passwordRecoveryModel.update(
            { isUsed: true },
            { where: { idUserFk: userId } }
        );
    }
}

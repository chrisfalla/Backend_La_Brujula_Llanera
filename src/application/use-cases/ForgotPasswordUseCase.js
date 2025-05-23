export default class ForgotPasswordUseCase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async forgotPassword(email, newPassword) {
        try {
            const user = await this.userRepository.getUserByEmail(email);
            if (!user) {
                throw new Error('User not found');
            }
            await this.userRepository.changePassword(user.idUser, newPassword);
            return user;
        } catch (error) {
            throw new Error(error.message);
        }
        
    }
}
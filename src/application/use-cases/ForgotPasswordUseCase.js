export default class ForgotPasswordUseCase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async forgotPassword(idUser, newPassword) {
        try {
            const user = await this.userRepository.getUserById(idUser);
            if (!user) {
                throw new Error('User not found');
            }
            await this.userRepository.changePassword(idUser, newPassword);
            return { message: 'Password changed successfully' };
        } catch (error) {
            throw new Error(error.message);
        }
        
    }
}
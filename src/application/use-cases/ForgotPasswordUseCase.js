export default class ForgotPasswordUseCase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async forgotPassword(email, newPassword) {
        try {
            console.log("EMAIL:", email);
            const user = await this.userRepository.getUserByEmail(email);
            console.log("USER FOUND:", user);
    
            if (!user) {
                throw new Error('User not found');
            }
    
            await this.userRepository.changePassword(user.idUser, newPassword);
            return user;
        } catch (error) {
            console.error("FORGOT PASSWORD ERROR:", error.message);
            throw new Error(error.message);
        }
    }
}
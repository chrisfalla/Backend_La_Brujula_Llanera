export default class GetUserUseCase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async getUser(idUser) {
        const user = await this.userRepository.getUserById(idUser);
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    }

    async getUserByEmail(email) {
        const user = await this.userRepository.getUserByEmail(email);
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    }
}
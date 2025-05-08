export default class RegisterUserUseCase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async register(user) {
        const existingUser = await this.userRepository.getUserByEmail(user.email);
        if (existingUser) {
            throw new Error('Email already in use');
        }
        const newUser = await this.userRepository.createUser(user);
        return newUser;
    }
}
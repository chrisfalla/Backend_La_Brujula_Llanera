import UserDTO from "../DTOs/UserDTO.js"

export default class LoginUserUseCase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async login(email, password){
        const user = await this.userRepository.getUserByEmail(email);
        if (!user) {
            throw new Error('User not found');
        }
        if (user.password !== password) {
            throw new Error('Invalid password');
        }
        return new UserDTO(user.email, user.password);
    }

}
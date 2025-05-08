import LogInDTO from "../DTOs/LogInDTO.js";
import bcrypt from 'bcrypt';

export default class LoginUserUseCase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async login(email, password) {
        const user = await this.userRepository.getUserByEmail(email);
        if (!user) {
            throw new Error('User not found');
        }
    
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid password');
        }
    
        return new LogInDTO(user.idUser, user.email);
    }
    

}
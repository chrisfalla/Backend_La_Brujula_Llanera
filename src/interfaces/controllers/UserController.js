import CreateUserDTO from "../../application/DTOs/CreateUserDTO.js";
import { generateAccessToken } from "../../application/utils/jwt.js";
import bcrypt from 'bcrypt';

export default class UserController {
    constructor(loginUserUseCase, registerUserUseCase) {
        this.loginUserUseCase = loginUserUseCase;
        this.registerUserUseCase = registerUserUseCase;
    }
    async loginUser(req, res) {
        try {
            const { email, password } = req.body;
            const user = await this.loginUserUseCase.login(email, password);
            if (!user) {
                return res.status(401).json({ message: 'Invalid email or password' });
            }
            const token = generateAccessToken({ id: user.idUser });

            return res.status(200).json({ message: 'Login successful', token });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error while logging in' });
        }
    }
    async registerUser(req, res) {
        try {
            const { names, email, idGender, phone, birthday, avatar, password } = req.body;
            const hasAceptedTC = true;
            const isBlocked = false;
            const idRoleFk = 2; // Default role for new users (User Role)

            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            const newUser = new CreateUserDTO(names, phone, email, birthday, hasAceptedTC, isBlocked, avatar, idRoleFk, hashedPassword, idGender);
            const user = await this.registerUserUseCase.register(newUser);
            if (!user) {
                return res.status(400).json({ message: 'Error while creating user' });
            }
            return res.status(201).json({ message: 'User registered successfully' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error while registering user' });
        }
    }
}
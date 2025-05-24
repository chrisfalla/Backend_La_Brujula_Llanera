import CreateUserDTO from "../../application/DTOs/CreateUserDTO.js";
import UserDetailDTO from "../../application/DTOs/UserDetailDTO.js";
import { generateAccessToken } from "../../application/utils/jwt.js";
import bcrypt from 'bcrypt';

export default class UserController {
    constructor(loginUserUseCase, registerUserUseCase, forgotPasswordUseCase, getUserUseCase, updateUserInfoUseCase) {
        this.loginUserUseCase = loginUserUseCase;
        this.registerUserUseCase = registerUserUseCase;
        this.forgotPasswordUseCase = forgotPasswordUseCase;
        this.getUserUseCase = getUserUseCase;
        this.updateUserInfoUseCase = updateUserInfoUseCase;
    }
    async loginUser(req, res) {
        try {
            const { email, password } = req.body;
            const user = await this.loginUserUseCase.login(email, password);
            if (!user) {
                return res.status(401).json({ message: 'Invalid email or password' });
            }
            const token = generateAccessToken({ idUser: user.idUser });
            const getUser = await this.getUserUseCase.getUser(user.idUser);

            const userDetail = new UserDetailDTO(getUser.idUser, getUser.names, getUser.phone, getUser.email, getUser.birthday, getUser.Avatar, getUser.idRoleFk, getUser.idGender);

            return res.status(200).json({ message: 'Login successful', token, user: userDetail });
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

            const newUser = new CreateUserDTO({
                names,
                phone,
                email,
                birthday,
                hasAceptedTC,
                isBlocked,
                avatar,
                idRoleFk,
                password: hashedPassword,
                idGender
            });
            const user = await this.registerUserUseCase.register(newUser);
            if (!user) {
                return res.status(400).json({ message: 'Error while creating user' });
            }
            const userDetail = new UserDetailDTO(user.idUser, user.names, user.phone, user.email, user.birthday, user.Avatar, user.idRoleFk, user.idGender);  
            const token = generateAccessToken({ idUser: user.idUser });
            return res.status(201).json({ message: 'User registered successfully', token , user: userDetail });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error while registering user' });
        }
    }    async forgotPassword(req, res) {
        try {
            const { email, newPassword } = req.body;
            
            if (!email || !newPassword) {
                return res.status(400).json({ message: 'Missing required parameters: email and newPassword are required.' });
            }

            const newHashedPassword = await bcrypt.hash(newPassword, 10);
            const result = await this.forgotPasswordUseCase.forgotPassword(email, newHashedPassword);
            
            if (!result) {
                return res.status(404).json({ message: 'User not found or password recovery failed.' });
            }
            
            return res.status(200).json({ 
                message: 'Password Updated Successfully', 
                idUser: result.idUser 
            });
        } catch (error) {
            console.error('[FORGOT PASSWORD] Error general:', error);
            return res.status(500).json({ message: 'Error while resetting password', error: error.message });
        }
    }
    async updateUserInfo(req, res) {
        try {
            const { idUser, names, email, phone } = req.body;
            if (!idUser || !names || !email || !phone) {
                return res.status(400).json({ message: "Missing required parameters" });
            }
            const updatedUser = await this.updateUserInfoUseCase.updateUserInfo(idUser, names, email, phone);
            if (!updatedUser) {
                return res.status(404).json({ message: "Error updating user information" });
            }
            return res.status(200).json({ message: "User information updated successfully" });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error while updating user info' });
        }
    }
}
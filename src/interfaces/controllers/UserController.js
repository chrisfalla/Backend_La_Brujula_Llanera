import { generateAccessToken } from "../../application/utils/jwt.js";
export default class UserController {
    constructor(loginUserUseCase) {
        this.loginUserUseCase = loginUserUseCase;
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
}
import User from "../../domain/entities/User.js";
import UserDTO from "../../application/DTOs/UserDTO.js";
import IUserRepository from "../../domain/repositories/IUserRepository.js";

export default class UserRepository extends IUserRepository {
    constructor(userModel) {
        super();
        this.userModel = userModel;
    }
    async createUser(user) {
        const newUser = await this.userModel.create(user);
        return new User(
            newUser.idUser,
            newUser.names,
            newUser.lastNames,
            newUser.phone,
            newUser.email,
            newUser.birthday,
            newUser.hasAceptedTC,
            newUser.isBlocked,
            newUser.avatar,
            newUser.idRoleFk,
            newUser.createdAt,
            newUser.updatedAt,
            newUser.password
        );
    }
    async getUserById(idUser) {
        const user = await this.userModel.findByPk(idUser);
        if (!user) {
            return null;
        }
        return new User(
            user.idUser,
            user.names,
            user.lastNames,
            user.phone,
            user.email,
            user.birthday,
            user.hasAceptedTC,
            user.isBlocked,
            user.avatar,
            user.idRoleFk,
            user.createdAt,
            user.updatedAt,
            user.password
        );
    }
    async updateUser(user) {
        const updatedUser = await this.userModel.update(user, {
            where: { idUser: user.idUser },
        });
        return updatedUser;
    }
    async deleteUser(idUser) {
        const deletedUser = await this.userModel.destroy({
            where: { idUser },
        });
        return deletedUser;
    } 
    async getUserByEmail(email) {
        const user = await this.userModel.findOne({
            where: { email },
        });
        if (!user) {
            return null;
        }
        return new UserDTO(user.idUser, user.email, user.password);
    }
}
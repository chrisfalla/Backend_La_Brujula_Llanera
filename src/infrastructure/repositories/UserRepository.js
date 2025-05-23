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
        const userData = newUser.dataValues;
        return new User(
            userData.idUser,
            userData.names,
            userData.phone,
            userData.email,
            userData.birthday,
            userData.hasAceptedTC,
            userData.isBlocked,
            userData.avatar,
            userData.idRoleFk,
            userData.createdAt,
            userData.updatedAt,
            userData.password,
            userData.idGender
        );
    }
    async getUserById(idUser) {
        const user = await this.userModel.findByPk(idUser);
        const userData = user.dataValues;
        if (!user) {
            return null;
        }
        return new User(
            userData.idUser,
            userData.names,
            userData.phone,
            userData.email,
            userData.birthday,
            userData.hasAceptedTC,
            userData.isBlocked,
            userData.avatar,
            userData.idRoleFk,
            userData.createdAt,
            userData.updatedAt,
            userData.password,
            userData.idGender
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
        return new UserDTO(user.idUser, user.names, user.email, user.password);
    }
    async changePassword(idUser, newPassword) {
        const updatedUser = await this.userModel.update(
            { password: newPassword },
            { where: { idUser } }
        );
        return updatedUser;
    }
    async updateUserInfo(idUser, names, email, phone) {
        const updatedUser = await this.userModel.update(
            { names, email, phone },
            { where: { idUser } }
        );
        return updatedUser;
    }
}
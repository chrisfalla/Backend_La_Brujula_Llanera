export default class CreateUserDTO {
    constructor({ names, phone, email, birthday, hasAceptedTC, isBlocked, avatar, idRoleFk, password, idGender }) {
        this.names = names;
        this.phone = phone;
        this.email = email;
        this.birthday = birthday;
        this.hasAceptedTC = hasAceptedTC;
        this.isBlocked = isBlocked;
        this.avatar = avatar;
        this.idRoleFk = idRoleFk;
        this.password = password;
        this.idGender = idGender;
    }
}

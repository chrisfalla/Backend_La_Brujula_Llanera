export default class User{
    constructor(idUser, names, phone, email, birthday, hasAceptedTC, isBlocked, avatar, idRoleFk, createdAt, updatedAt, password, idGender){
        this.idUser = idUser;
        this.names = names;
        this.phone = phone;
        this.email = email;
        this.birthday = birthday;
        this.hasAceptedTC = hasAceptedTC;
        this.isBlocked = isBlocked;
        this.avatar = avatar;
        this.idRoleFk = idRoleFk;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.password = password;
        this.idGender = idGender;
    }
}
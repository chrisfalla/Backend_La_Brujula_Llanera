export default class UserDetailDTO {
    constructor(idUser, names, phone, email, birthDay, idAvatar, idRole, idGender) {
        this.idUser = idUser;
        this.names = names;
        this.phone = phone;
        this.email = email;
        this.birthDay = birthDay;
        this.idAvatar = idAvatar;
        this.idRole = idRole;
        this.idGender = Number(idGender);
    }
}
export default class Place{
    constructor({ idPlace, name, description, phoneNumber, idCategorie, createdAt, updatedAt}) {
        this.idPlace = idPlace;
        this.name = name;
        this.description = description;
        this.phoneNumber = phoneNumber;
        this.idCategorie = idCategorie;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
export default class Place{
    constructor({ idPlace, name, description, idCategorie, createdAt, updatedAt, idSocialMedia}) {
        this.idPlace = idPlace;
        this.name = name;
        this.description = description;
        this.idCategorie = idCategorie;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.idSocialMedia = idSocialMedia
    }
}
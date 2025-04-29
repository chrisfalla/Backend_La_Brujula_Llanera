export default class Favorite{
    constructor(idFavorite, idUserFk, idPlaceFk, createdAt, updatedAt) {
        this.idFavorite = idFavorite;
        this.idUserFk = idUserFk;
        this.idPlaceFk = idPlaceFk;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

}
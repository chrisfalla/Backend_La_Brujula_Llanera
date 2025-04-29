export default class ImageByPlace{
    constructor(idImageByPlace, urlImage, idImageCategorieFk, idPlaceFk, createdAt, updatedAt) {
        this.idImageByPlace = idImageByPlace;
        this.urlImage = urlImage;
        this.idImageCategorieFk = idImageCategorieFk;
        this.idPlaceFk = idPlaceFk;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

}
export class AddressByPlace {
    constructor(idAddressByPlace, idPlaceFk, idAddressFk, createdAt, updatedAt) {
        this.idAddressByPlace = idAddressByPlace;
        this.idPlaceFk = idPlaceFk;
        this.idAddressFk = idAddressFk;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
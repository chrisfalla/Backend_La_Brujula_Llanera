import IAddressByPlace from "../../domain/repositories/IAddressByPlace.js";

export default class AddressByPlaceRepository extends IAddressByPlace {
    constructor(addressByPlaceModel) {
        super();
        this.addressByPlaceModel = addressByPlaceModel;
    }
    async getAddressByPlaceIds(idPlace) {
        const addressByPlace = await this.addressByPlaceModel.findAll({
            where: {
                idPlaceFk: idPlace,
            },
        });
        return addressByPlace;
    }
    async addAddressByPlace(idPlace, idAddress) {
        const newAddressByPlace = await this.addressByPlaceModel.create({
            idPlaceFk: idPlace,
            idAddressFk: idAddress,
        });
        return newAddressByPlace;
    }
}
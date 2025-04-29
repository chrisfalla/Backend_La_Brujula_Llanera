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
}
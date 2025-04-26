import { IAddressByPlace } from "../../domain/repositories/IAddressByPlace.js";
import { AddressByPlaceModel } from "../models/AddressByPlaceModel.js";

export class AddressByPlaceRepository extends IAddressByPlace {
    async getAddressByPlaceIds(idPlace) {
        const addressByPlace = await AddressByPlaceModel.findAll({
            where: {
                idPlaceFk: idPlace,
            },
        });
        return addressByPlace;
    }
}
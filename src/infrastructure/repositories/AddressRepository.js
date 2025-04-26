import { AddressModel } from "../models/AddressModel.js";
import { IAddressRepository } from "../../domain/repositories/IAddressRepository.js";

export class AddressRepository extends IAddressRepository {
    async getAddressByIds(idAddress) {
        const address = await AddressModel.findAll({
            where: {
                idAddress: idAddress,
            },
        });
        return address;
    }
}
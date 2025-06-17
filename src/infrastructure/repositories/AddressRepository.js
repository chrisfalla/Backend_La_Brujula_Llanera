import IAddressRepository from "../../domain/repositories/IAddressRepository.js";

export default class AddressRepository extends IAddressRepository {
    constructor(addressModel) {
        super();
        this.addressModel = addressModel;
    }
    async getAddressByIds(idAddress) {
        const address = await this.addressModel.findAll({
            where: {
                idAddress: idAddress,
            },
        });
        return address;
    }
    async addAddress(description) {
        const newAddress = await this.addressModel.create({description});
        return newAddress;
    }
}
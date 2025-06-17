export default class PostAddressByPlaceUseCase {
    constructor(addressRepository, addressByPlaceRepository){
        this.addressRepository = addressRepository;
        this.addressByPlaceRepository = addressByPlaceRepository;
    }
    async addAddressByPlace(description, idPlace){
        const addAddress = await this.addressRepository.addAddress(description);
        if (!addAddress) {
            throw new Error('Error adding address');
        }
        const addAddresByPlace = await this.addressByPlaceRepository.addAddressByPlace(idPlace, addAddress.idAddress)
        if (!addAddresByPlace) {
            throw new Error('Error adding address by place');
        }
        return addAddresByPlace;
    }
}
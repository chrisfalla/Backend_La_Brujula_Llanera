import PlaceByCategoryDTO from "../DTOs/PlaceByCategoryDTO.js";
export default class GetPlacesByCategoryUseCase {
    constructor(placeRepository, categoryRepository, imageCategoryRepository, imageByPlaceRepository, addressRepository, addressByPlaceRepository) {
        this.placeRepository = placeRepository;
        this.categoryRepository = categoryRepository;
        this.imageCategoryRepository = imageCategoryRepository;
        this.imageByPlaceRepository = imageByPlaceRepository;
        this.addressRepository = addressRepository;
        this.addressByPlaceRepository = addressByPlaceRepository;
    }
    async getPlacesByCategory(idCategory){
        const places = await this.placeRepository.getPlacesByCategory(idCategory);
        const placeIds = places.map(rel => rel.idPlace);
        const category = await this.categoryRepository.getById(idCategory);
        const imageCategory = await this.imageCategoryRepository.getImageCategoryByName("Logo");
        const images = await this.imageByPlaceRepository.getImagesByPlaceIds(
            placeIds,
            imageCategory.idImageCategory
        );
        const addressByPlaceRelations = await this.addressByPlaceRepository.getAddressByPlaceIds(placeIds);
        const addressIds = addressByPlaceRelations.map(rel => rel.idAddressFk);
        const addresses = await this.addressRepository.getAddressByIds(addressIds);
        if (!addresses.length) return [];
        const addressMap = new Map();
        addressByPlaceRelations.forEach(rel => {
            const address = addresses.find(a => a.idAddress === rel.idAddressFk);
            if (address) {
                addressMap.set(rel.idPlaceFk, address.description);
            }
        });
        const imageMap = new Map();
        images.forEach(img => {
            if (!imageMap.has(img.idPlaceFk)) {
                imageMap.set(img.idPlaceFk, img.urlImage);
            }
        });
        return places.map(place => {
            return {
                place: new PlaceByCategoryDTO(
                    place.idPlace,
                    place.name,
                    addressMap.get(place.idPlace) || null,
                    imageMap.get(place.idPlace) || null,
                    imageCategory.name,
                ),
                categoryInfo: {
                    idCategory: place.idCategorie,
                    category: category.name,
                }
            };
        });

    }
}
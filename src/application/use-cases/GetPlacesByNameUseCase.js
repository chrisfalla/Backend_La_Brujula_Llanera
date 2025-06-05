export default class GetPlacesByNameUseCase {
  constructor(placeRepository, categoryRepository, imageCategoryRepository, imageByPlaceRepository, addressRepository, addressByPlaceRepository) {
    this.placeRepository = placeRepository;
    this.categoryRepository = categoryRepository;
    this.imageCategoryRepository = imageCategoryRepository;
    this.imageByPlaceRepository = imageByPlaceRepository;
    this.addressRepository = addressRepository;
    this.addressByPlaceRepository = addressByPlaceRepository;
  }

  async getPlacesByNameUseCase(name) {
    const place = await this.placeRepository.getPlaceByName(name);
    const category = await this.categoryRepository.getById(place.idCategorie);
    if (!place) {
        return null;
      }  
    const imageCategory = await this.imageCategoryRepository.getImageCategoryByName("Logo");
    const images = await this.imageByPlaceRepository.getImagesByPlaceIds(
        place.idPlace,
        imageCategory.idImageCategory
    );
    const addressByPlaceRelations = await this.addressByPlaceRepository.getAddressByPlaceIds(place.idPlace);
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
        return {
            place: {
                idPlace: place.idPlace,
                name: place.name,
                address: addressMap.get(place.idPlace) || null,
                image: imageMap.get(place.idPlace) || null,
                imageCategory: imageCategory.name,
            },
            categoryInfo: {
                idCategory: place.idCategorie,
                category: category.name,
            }
        };
    
  }
}
export default class AddImagesByPlaceUseCase {
    constructor(placeRepository, imageCategoryRepository, imageByPlaceRepository) {
      this.placeRepository = placeRepository;
      this.imageCategoryRepository = imageCategoryRepository;
      this.imageByPlaceRepository = imageByPlaceRepository;
    }
  
    async addImages(idPlace, imagesObject) {
      for (const category in imagesObject) {
        const urls = imagesObject[category];
 
        const imageCategory = await this.imageCategoryRepository.getImageCategoryByName(category);
        if (!imageCategory) {
          throw new Error(`ImageCategory not found: ${category}`);
        }

        if (Array.isArray(urls)) {
          for (const url of urls) {
            await this.imageByPlaceRepository.addImageByPlace(url, idPlace, imageCategory.idImageCategory);
          }
        } else if (typeof urls === "string") {
          await this.imageByPlaceRepository.addImageByPlace(urls, idPlace, imageCategory.idImageCategory);
        } else {
          console.warn(`Formato de imagen inválido para categoría: ${category}`);
        }
      }
  
      return { message: 'Images Saved Successfully' };
    }
  }
  
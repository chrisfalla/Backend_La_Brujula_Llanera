import MoreVisitedPlacesDTO from "../DTOs/MoreVisitedPlacesDTO.js";

export default class GetMoreVisitedPlaces {
    constructor(logVisitedRepository, placeRepository, imageByPlaceRepository, imageCategoryRepository) {
        this.logVisitedRepository = logVisitedRepository;
        this.placeRepository = placeRepository;
        this.imageByPlaceRepository = imageByPlaceRepository;
        this.imageCategoryRepository = imageCategoryRepository;
    }
    async execute() {
        const logVisits = await this.logVisitedRepository.getMoreVisitedPlaces();
        const imageCategory = await this.imageCategoryRepository.getImageCategoryByName("Principal");
        if (!imageCategory) return [];

        const placeIds = logVisits.map(log => log.idPlaceFk);
        const places = await this.placeRepository.getPlacesByIds(placeIds);
        if (!places.length) return [];

        const images = await this.imageByPlaceRepository.getImagesByPlaceIds(placeIds, imageCategory.idImageCategory);

        const imageMap = new Map();
        images.forEach(img => {
            if (!imageMap.has(img.idPlaceFk)) {
                imageMap.set(img.idPlaceFk, img); 
            }
        });

        const visitMap = new Map();
        logVisits.forEach(log => {
            visitMap.set(log.idPlaceFk, parseInt(log.visitCount, 10));
        });

        return places.map(place => {
            const image = imageMap.get(place.idPlace); 
            return new MoreVisitedPlacesDTO(
                place.name,
                place.idPlace,
                visitMap.get(place.idPlace) || 0,
                imageCategory.name,
                image ? image.urlImage : null
            );
        });
    }
}

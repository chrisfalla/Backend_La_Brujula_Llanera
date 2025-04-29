import { LogVisitedRepository } from "../../infrastructure/repositories/LogVisitedRepository.js";
import { PlaceRepository } from "../../infrastructure/repositories/PlaceRepository.js";
import { ImageByPlaceRepository } from "../../infrastructure/repositories/ImageByPlaceRepository.js";
import { ImageCategoryRepository } from "../../infrastructure/repositories/ImageCategoryRepository.js";

export class GetMoreVisitedPlaces {
    async execute() {
        const logVisitedRepository = new LogVisitedRepository();
        const placeRepository = new PlaceRepository();
        const imageByPlaceRepository = new ImageByPlaceRepository();
        const imageCategoryRepository = new ImageCategoryRepository();

        const logVisits = await logVisitedRepository.getMoreVisitedPlaces();
        const imageCategory = await imageCategoryRepository.getImageCategoryByName("Principal");
        if (!imageCategory) return [];

        const placeIds = logVisits.map(log => log.idPlaceFk);
        const places = await placeRepository.getPlacesByIds(placeIds);
        if (!places.length) return [];

        const images = await imageByPlaceRepository.getImagesByPlaceIds(placeIds, imageCategory.idImageCategory);

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
            return {
                name: place.name,
                idPlace: place.idPlace,
                visitCount: visitMap.get(place.idPlace) || 0, 
                imageUrl: image ? image.urlImage : null, 
                imageCategoryId: image ? image.idImageCategorieFk : null
            };
        });
    }
}

import { LogVisitedRepository } from "../../infrastructure/repositories/LogVisitedRepository.js";
import { PlaceRepository } from "../../infrastructure/repositories/PlaceRepository.js";
import { ImageByPlaceRepository } from "../../infrastructure/repositories/ImageByPlaceRepository.js";
import { ImageCategoryRepository } from "../../infrastructure/repositories/ImageCategoryRepository.js";

export class GetMoreVisitedPlaces {
    async execute(){
        const logVisitedRepository = new LogVisitedRepository();
        const placeRepository = new PlaceRepository();
        const imageByPlaceRepository = new ImageByPlaceRepository();
        const imageCategoryRepository = new ImageCategoryRepository();

        const logVisits = await logVisitedRepository.getMoreVisitedPlaces();
        const imageCategory = await imageCategoryRepository.getImageCategoryByName("Principal");
        if (!imageCategory) return [];  

        const places = await placeRepository.getPlacesByIds(logVisits.map(logVisit => logVisit.idPlace));
        const imagesByPlace = await imageByPlaceRepository.getImagesByPlaces(places.map(place => place.idPlace));
        

        return {
            logVisits,
            places,
            imagesByPlace,
            imageCategories
        };
    }
}
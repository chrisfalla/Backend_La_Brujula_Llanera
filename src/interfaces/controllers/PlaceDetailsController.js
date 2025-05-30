export default class PlaceDetailsController {
    constructor(placeDetailUseCase, getPlacesByCategoryUseCase) {
        this.placeDetailUseCase = placeDetailUseCase;
        this.getPlacesByCategoryUseCase = getPlacesByCategoryUseCase;
    }

    async getPlaceDetails(req, res) {
        try {
            const { idPlace } = req.params; 
            const placeDetails = await this.placeDetailUseCase.execute(idPlace);
            console.log("placeDetails");
            console.log(placeDetails);
            if (!placeDetails) {
                return res.status(404).json({ message: "Place not found" });
            }
            return res.status(200).json(placeDetails);
        } catch (error) {
            console.error("Error fetching place details:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
    async getPlacesByCategory(req, res) {
        try {
            const { idCategory } = req.params; 
            const places = await this.getPlacesByCategoryUseCase.getPlacesByCategory(idCategory);
            if (!places || places.length === 0) {
                return res.status(404).json({ message: "No places found for this category" });
            }
            return res.status(200).json(places);
        } catch (error) {
            console.error("Error fetching places by category:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
}
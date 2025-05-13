export default class PlaceDetailsController {
    constructor(placeDetailUseCase) {
        this.placeDetailUseCase = placeDetailUseCase;
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
}
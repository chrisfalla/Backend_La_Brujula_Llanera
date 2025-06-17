export default class PlaceDetailsController {
    constructor(placeDetailUseCase, getPlacesByCategoryUseCase, getPlacesByNameUseCase, addPlaceUseCase, postAddressByPlaceUseCase, postTagByPlaceUseCase, AddImagesByPlaceUseCase) {
        this.placeDetailUseCase = placeDetailUseCase;
        this.getPlacesByCategoryUseCase = getPlacesByCategoryUseCase;
        this.getPlacesByNameUseCase = getPlacesByNameUseCase;
        this.addPlaceUseCase = addPlaceUseCase;
        this.postAddressByPlaceUseCase = postAddressByPlaceUseCase;
        this.postTagByPlaceUseCase = postTagByPlaceUseCase;
        this.AddImagesByPlaceUseCase = AddImagesByPlaceUseCase;
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
    async getPlacesByName(req, res) {
        try {
            const { name } = req.params; 
            const places = await this.getPlacesByNameUseCase.getPlacesByNameUseCase(name);
            if (!places || places.length === 0) {
                return res.status(404).json({ message: "No places found with this name" });
            }
            return res.status(200).json(places);
        } catch (error) {
            console.error("Error fetching places by name:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
    async addPlace(req, res) {
        try {
            const { name, description, nameCategory } = req.body; 
            const newPlace = await this.addPlaceUseCase.addPlaceUC(name, description, nameCategory);
            return res.status(201).json(newPlace);
        } catch (error) {
            console.error("Error adding place:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
    async postAddressByPlace(req, res) {
        try {
            const { description, idPlace } = req.body; 
            const address = await this.postAddressByPlaceUseCase.addAddressByPlace(description, idPlace);
            return res.status(201).json(address);
        } catch (error) {
            console.error("Error adding address by place:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
    async AddTagsByPlace(req, res) {
        try {
          const { placeId } = req.params;
          const { tagNames } = req.body;
          const result = await this.postTagByPlaceUseCase.AddTagsByPlace(placeId, tagNames);
          res.status(200).json(result);
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Error while adding tags to place' });
        }
      }
    async addImages(req, res) {
        try {
            const { placeId } = req.params;
            const images = req.body;  

            if (!images || typeof images !== 'object') {
                return res.status(400).json({ message: 'Invalid images format' });
            }

            const result = await this.AddImagesByPlaceUseCase.addImages(placeId, images);
            return res.status(200).json(result);
        } catch (error) {
            console.error("Error adding images by place:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
    
}
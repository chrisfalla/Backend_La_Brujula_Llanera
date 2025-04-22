import { GetTopRatedPlaces } from "../../application/use-cases/GetTopRatedPlaces.js";

export class PlaceController {

  static async getTopRatedPlaces(req, res) {
    try {
      const getTopRatedPlacesUseCase = new GetTopRatedPlaces();
      let idCategory = parseInt(req.params.idCategory);
      if (isNaN(idCategory)) {
        idCategory = 1; 
      }

      const result = await getTopRatedPlacesUseCase.execute(idCategory);
      res.json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

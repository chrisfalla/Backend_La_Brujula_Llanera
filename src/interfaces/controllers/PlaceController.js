import { GetTopRatedPlacesByCategory } from "../../application/use-cases/GetTopRatedPlacesByCategory.js";
import { GetTopRatedPlacesByTags } from "../../application/use-cases/GetTopRatedPlacesByTags.js";

export class PlaceController {

  static async getTopRatedPlacesByCategory(req, res) {
    try {
      const getTopRatedPlacesUseCase = new GetTopRatedPlacesByCategory();
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
  static async getTopRatedPlacesByTags(req, res) {
    try {
      const { tags } = req.body;

      if (!Array.isArray(tags) || tags.length === 0) {
        return res.status(400).json({ error: "Tags must be a non-empty array" });
      }

      const getTopRatedPlacesByTags = new GetTopRatedPlacesByTags();
      const result = await getTopRatedPlacesByTags.execute(tags);
      res.json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

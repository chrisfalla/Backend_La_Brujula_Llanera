export default class PlaceController {
  constructor(getTopRatedPlacesByCategory, getTopRatedPlacesByTags, getMoreVisitedPlaces) {
    this.getTopRatedPlacesByCategory = getTopRatedPlacesByCategory;
    this.getTopRatedPlacesByTags = getTopRatedPlacesByTags;
    this.getMoreVisitedPlaces = getMoreVisitedPlaces;
    
  }
  async getTopRatedPlacesByCategoryUC(req, res) {
    try {
      let idCategory = parseInt(req.params.idCategory);
      if (isNaN(idCategory)) {
        idCategory = 1; 
      }

      const result = await this.getTopRatedPlacesByCategory.execute(idCategory);
      res.json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  async getTopRatedPlacesByTagsUC(req, res) {
    try {
      let { tags } = req.body;

      if (!Array.isArray(tags) || tags.length === 0) {
        tags = [1, 2];
      }
      const result = await this.getTopRatedPlacesByTags.execute(tags);
      res.json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  async getMoreVisitedPlacesUC(req, res) {
    try {
        const logVisits = await this.getMoreVisitedPlaces.execute();

        if (!logVisits || logVisits.length === 0) {
            return res.status(404).json({ message: 'No popular places found.' });
        }

        return res.status(200).json(logVisits);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error while getting the visited places.' });
    }
}
}

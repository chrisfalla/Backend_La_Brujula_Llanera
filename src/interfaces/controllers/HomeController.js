export default class PlaceController {
  constructor(PromotedPlacesByCategory, PromotedPlacesByTag, getMoreVisitedPlaces) {
    this.PromotedPlacesByCategory = PromotedPlacesByCategory;
    this.PromotedPlacesByTag = PromotedPlacesByTag;
    this.getMoreVisitedPlaces = getMoreVisitedPlaces;
    
  }
  async PromotedPlacesByCategoryCT(req, res) {
    try {
      let idCategory = parseInt(req.params.idCategory);
      const result = await this.PromotedPlacesByCategory.execute(idCategory);
      res.json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  async PromotedPlacesByTagCT(req, res) {
    try {
      const tagId = parseInt(req.query.tagId, 10);
  
      if (isNaN(tagId)) {
        return res.status(400).json({ error: "Invalid or missing tagId" });
      }
  
      const result = await this.PromotedPlacesByTag.execute(tagId);
  
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

export class PlaceController {
  constructor(getTopRatedPlacesUseCase) {
    this.getTopRatedPlacesUseCase = getTopRatedPlacesUseCase;
  }

  async getTopRatedPlaces(req, res) {
    try {
      let idCategory = parseInt(req.params.idCategory);
      if (isNaN(idCategory)) {
        idCategory = 1; 
      }

      const result = await this.getTopRatedPlacesUseCase.execute(idCategory);
      res.json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

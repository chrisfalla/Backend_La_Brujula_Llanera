export class PlaceController {
  constructor(getTopRatedPlacesUseCase) {
    this.getTopRatedPlacesUseCase = getTopRatedPlacesUseCase;
  }

  async getTopRatedPlaces(req, res) {
    try {
      const { idCategory } = req.params;
      const result = await this.getTopRatedPlacesUseCase.execute(parseInt(idCategory));
      res.json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

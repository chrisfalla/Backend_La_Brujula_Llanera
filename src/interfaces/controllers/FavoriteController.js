export default class FavoriteController {
    constructor(favoriteUseCase) {
        this.favoriteUseCase = favoriteUseCase;
    }

    async createFavorite(req, res) {
        const { idUserFk, idPlaceFk } = req.body;

        try {
            const favorite = await this.favoriteUseCase.createFavorite(idUserFk, idPlaceFk);
            res.status(201).json(favorite);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async deleteFavorite(req, res) {
        const { idUserFk, idPlaceFk } = req.params;

        try {
            await this.favoriteUseCase.deleteFavorite(idUserFk, idPlaceFk);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}


export default class FavoriteController {
    constructor(favoriteUseCase, getFavoritePlacesByUserUseCase) {
        this.favoriteUseCase = favoriteUseCase;
        this.getFavoritePlacesByUserUseCase = getFavoritePlacesByUserUseCase;
    }
    async getFavoritesByUserId(req, res) {
        const { idUserFk } = req.params;

        try {
            const favorites = await this.getFavoritePlacesByUserUseCase.GetFavoritePlaces(idUserFk);
            if (!favorites) {
                return res.status(404).json({ message: "No favorites found for this user." });
            }
            res.status(200).json(favorites);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
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


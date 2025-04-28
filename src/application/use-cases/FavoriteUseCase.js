export default class FavoriteUseCase {
    constructor(favoriteRepository) {
        this.favoriteRepository = favoriteRepository;
    }

    async createFavorite(idUserFk, idPlaceFk) {
        return await this.favoriteRepository.createFavorite(idUserFk, idPlaceFk);
    }

    async deleteFavorite(idUserFk, idPlaceFk) {
        return await this.favoriteRepository.deleteFavorite(idUserFk, idPlaceFk);
    }
}
import IFavoriteRepository from "../../domain/repositories/IFavoriteRepository.js"; // Importación predeterminada
import Favorite  from "../../domain/entities/Favorite.js";

export default class FavoriteRepository extends IFavoriteRepository {
    constructor(favoriteModel) {
        super(); // Llamada al constructor de la clase base
        this.favoriteModel = favoriteModel;
    }

    async createFavorite(idUserFk, idPlaceFk) {
        const result = await this.favoriteModel.create({
            idUserFk,
            idPlaceFk,
        });
        const { idFavorite, idUserFk: idUser, idPlaceFk: idPlace, createdAt, updatedAt } = result.toJSON();

        return new Favorite(
            idFavorite,
            idUser,
            idPlace,
            createdAt,
            updatedAt
        );
    }

    async deleteFavorite(idUserFk, idPlaceFk) {
        const result = await this.favoriteModel.destroy({
            where: {
                idUserFk,
                idPlaceFk,
            },
        });

        return result;
    }
    async getFavoritesByUserId(idUserFk) {
        const result = await this.favoriteModel.findAll({
            where: {
                idUserFk,
            },
        });

        return result.map((favorite) => {
            const { idFavorite, idUserFk, idPlaceFk, createdAt, updatedAt } = favorite.toJSON();
            return new Favorite(
                idFavorite,
                idUserFk,
                idPlaceFk,
                createdAt,
                updatedAt
            );
        });
    }
}

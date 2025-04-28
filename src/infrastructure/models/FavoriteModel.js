import { DataTypes } from "sequelize";
import { sequelize } from "../database/sequelize.js";

const FavoriteModel = sequelize.define("Favorite", {
    idFavorite: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "idFavorite",
    },
    idUserFk: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    idPlaceFk: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    tableName: "Favorite",
    timestamps: true,
});

export default FavoriteModel;

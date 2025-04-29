import { DataTypes } from "sequelize";
import { sequelize } from "../database/sequelize.js";

const ImageByPlaceModel = sequelize.define("ImageByPlace", {
    idImageByPlace: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "idImageByPlace",
    },
    urlImage: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    idImageCategorieFk: {
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
    tableName: "ImageByPlace",
    timestamps: true,
})

export default ImageByPlaceModel;
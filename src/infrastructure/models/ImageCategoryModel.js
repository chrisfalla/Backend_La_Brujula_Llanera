import { DataTypes } from "sequelize";
import { sequelize } from "../database/sequelize.js";

const ImageCategoryModel = sequelize.define("ImageCategory", {
    idImageCategory: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "idImageCategory",
    },
    name: {
        type: DataTypes.STRING,
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
    tableName: "ImageCategorie",
    timestamps: true,
});

export default ImageCategoryModel;
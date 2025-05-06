import { DataTypes } from "sequelize";
import { sequelize } from "../database/sequelize.js";
import SocialMediaModel from "./SocialMediaModel.js";

const SocialMediaByPlaceModel = sequelize.define(
    "SocialMediaByPlace",
    {
        idSocialMediaByPlace: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: "idSocialMediaByPlace",
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        value: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        idPlace: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Place",
                key: "idPlace",
            },
        },
        idSocialMedia: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "SocialMedia",
                key: "idSocialMedia",
            },
        },
    },
    {
        tableName: "SocialMediaByPlace",
        timestamps: true,
    }
);

SocialMediaByPlaceModel.belongsTo(SocialMediaModel, {
    foreignKey: 'idSocialMedia', 
    as: 'socialMedia',
  });

export default SocialMediaByPlaceModel;
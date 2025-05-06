import { DataTypes } from "sequelize";
import { sequelize } from "../database/sequelize.js";

const SocialMediaModel = sequelize.define(
    "SocialMedia",
    {
        idSocialMedia: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "idSocialMedia",
        },
        createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        },
        updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        },
        socialMediaName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        tableName: "SocialMedia",
        timestamps: true,
    }
)

export default SocialMediaModel;

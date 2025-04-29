import { DataTypes } from "sequelize";
import { sequelize } from "../database/sequelize.js";

const ReviewModel = sequelize.define(
  "Review",
  {
    idReview: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "idReview",
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    ratingValue: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    idPlaceFk: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    idUserFk: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    dateTime: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "Review",
    tableName: "Review", // Usa el nombre exacto como está en la BD (sensible a mayúsculas)
    timestamps: true,
  }
);

export default ReviewModel;
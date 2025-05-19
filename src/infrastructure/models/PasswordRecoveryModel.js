import { DataTypes } from "sequelize";
import { sequelize } from "../database/sequelize.js";

const PasswordRecoveryModel = sequelize.define("PasswordRecovery", {
    idPasswordRecovery: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "idPasswordRecovery",
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    codeValue: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },  
    expiresAt: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    attempts: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    idUserFk: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    isUsed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
}, {
    tableName: "PasswordRecovery",
    timestamps: false,
});

export default PasswordRecoveryModel;
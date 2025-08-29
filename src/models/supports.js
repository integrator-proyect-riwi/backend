import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Support = sequelize.define('support', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    documents: {
        type: DataTypes.BLOB,
    },
    reason: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    observation: {
        type: DataTypes.TEXT,
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    }
}, {
    tableName: "supports",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
});

export default Support;
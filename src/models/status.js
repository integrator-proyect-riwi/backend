import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import { baseFields } from "./baseModel.js";

const Status = sequelize.define("status", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(100),
    unique: true,
    allowNull: false,
  },
  codename: {
    type: DataTypes.STRING(100),
    unique: true,
    allowNull: false,
  },
  status_type_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "status_types",
      key: "id",
    },
  },
  ...baseFields
}, {
  tableName: "status",
  timestamps: false,
});

export default Status;
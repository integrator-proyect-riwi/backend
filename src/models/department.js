import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import { baseFields } from "./baseModel.js";

const Department = sequelize.define('department', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
  },
  codename: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
  },
  leader_id: {
    type: DataTypes.INTEGER,
    unique: true,
    allowNull: true,
  },
  ...baseFields,
}, {
  tableName: 'departments',
  timestamps: false,
});

export default Department;

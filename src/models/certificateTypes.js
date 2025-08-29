import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Certificate_types = sequelize.define("certificate_type", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  codename: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  }
}, {
  tableName: "certificate_types",
  timestamps: true,
  createdAt: "created_at",   // mapea createdAt → created_at
  updatedAt: "updated_at",   // mapea updatedAt → updated_at
});

export default Certificate_types;
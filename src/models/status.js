import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Status = sequelize.define("Status", {
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
  id_types_status: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  }
}, {
  tableName: "status",
  timestamps: true,
  createdAt: "created_at",   // mapea createdAt → created_at
  updatedAt: "updated_at",   // mapea updatedAt → updated_at
});

export default Status;
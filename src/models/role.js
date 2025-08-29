import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Role = sequelize.define("role", {
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
},  {
  tableName: "role",
  timestamps: true,
  createdAt: "created_at",
  updatedAt: "updated_at",
});

export default Role;
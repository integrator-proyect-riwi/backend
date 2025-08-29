import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Status_types = sequelize.define("status_type", {
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
  tableName: "status_types",
  timestamps: true,
  createdAt: "created_at",
  updatedAt: "updated_at",
});

export default Status_types;
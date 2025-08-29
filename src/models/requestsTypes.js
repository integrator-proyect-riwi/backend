import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Request_types = sequelize.define("request_type", {
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
  tableName: "request_types",
  timestamps: true,
  createdAt: "created_at",
  updatedAt: "updated_at",
});

export default Request_types;
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Contract_types = sequelize.define("contract_type", {
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
  tableName: "contract_types",
  timestamps: true,
  createdAt: "created_at",
  updatedAt: "updated_at",
});

export default Contract_types;
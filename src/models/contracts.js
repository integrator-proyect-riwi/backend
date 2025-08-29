import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Contract = sequelize.define("contract", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  start_date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  end_date: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  retire_date: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  responsibilities: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  salary: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: false,
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
}, {
  tableName: "contracts",
  timestamps: true,
  createdAt: "created_at",
  updatedAt: "updated_at",
});

export default Contract;

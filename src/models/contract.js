import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import { baseFields } from "./baseModel.js";

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
  status_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  contract_type_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  department_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  occupation_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  responsibilities: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  salary: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: false,
  },
  ...baseFields,
}, {
  tableName: "contracts",
  timestamps: false,
});

export default Contract;

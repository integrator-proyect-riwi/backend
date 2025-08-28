import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";


const Employees = sequelize.define("Employees", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  lastname: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  birthday: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  identification: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: "employees_identification_key"
  },
  id_gender: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_user: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_contract: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_status: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  }
}, {
  tableName: "employees",
  timestamps: true,
  createdAt: "created_at",   // mapea createdAt → created_at
  updatedAt: "updated_at",   // mapea updatedAt → updated_at
});

export default Employees;
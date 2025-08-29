import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Requests = sequelize.define("request", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  code: {
    type: DataTypes.STRING(7)
  },
  employee_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  request_type_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  support_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  priority_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  leader_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  start_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  end_date: {
    type: DataTypes.DATE
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  }
}, {
  tableName: "requests",
  timestamps: true,
  createdAt: "created_at",   // mapea createdAt → created_at
  updatedAt: "updated_at",   // mapea updatedAt → updated_at
});

export default Requests;

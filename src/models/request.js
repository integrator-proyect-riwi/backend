import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import { baseFields } from "./baseModel.js";

const Request = sequelize.define("request", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  code: {
    type: DataTypes.CHAR(7),
    unique: true,
    allowNull: false,
  },
  employee_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "employees",
      key: "id",
    },
  },
  request_type_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "request_types",
      key: "id",
    },
  },
  support_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "supports",
      key: "id",
    },
  },
  status_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "status",
      key: "id",
    },
  },
  priority_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "priorities",
      key: "id",
    },
  },
  leader_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "employees",
      key: "id",
    },
  },
  start_date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  end_date: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  ...baseFields
}, {
  tableName: "requests",
  timestamps: false,
});

export default Request;

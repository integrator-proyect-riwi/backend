import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Certificates = sequelize.define("Certificates", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_employee: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_type_certificate: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_status: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_priority: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  }
}, {
  tableName: "certificates_requests",
  timestamps: true,
  createdAt: "created_at",   // mapea createdAt → created_at
  updatedAt: "updated_at",   // mapea updatedAt → updated_at
});

export default Certificates;

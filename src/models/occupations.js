import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Occupations = sequelize.define("occupation", {
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
  tableName: "occupations",
  timestamps: true,
  createdAt: "created_at",
  updatedAt: "updated_at",
});

export default Occupations;
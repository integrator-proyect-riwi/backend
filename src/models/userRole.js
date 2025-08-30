import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import { baseFields } from "./baseModel.js";

const UserRole = sequelize.define('user_role', {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "users",
      key: "id",
    },
  },
  role_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "role",
      key: "id",
    },
  },
  ...baseFields,
}, {
  tableName: 'user_role',
  timestamps: false,
});

export default UserRole;
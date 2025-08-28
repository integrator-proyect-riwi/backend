import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Role from "./role.js";

const User = sequelize.define("user", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(150),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  passwd: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  id_user_role: {
    type: DataTypes.INTEGER,
    defaultValue: 2,
    allowNull: false
  },
},  {
  tableName: "users",
  timestamps: true,
  createdAt: "created_at",
  updatedAt: "updated_at",
});

User.belongsTo(Role, {
  foreignKey: "id_user_role",
});

export default User;
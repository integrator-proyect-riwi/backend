import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Role from "./role.js";

const User = sequelize.define("User", {
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
  createdAt: "created_at",   // mapea createdAt → created_at
  updatedAt: "updated_at",   // mapea updatedAt → updated_at
});

// Un usuario pertenece a un rol, usando la llave foránea `id_user_role`
User.belongsTo(Role, {
  foreignKey: "id_user_role",
});

// Un rol puede tener muchos usuarios, usando la llave foránea `id_user_role`
// (Esta relación es mejor definirla en el archivo del modelo Role para evitar dependencias circulares)
// Role.hasMany(User, {
//  foreignKey: "id_user_role",
// });

export default User;
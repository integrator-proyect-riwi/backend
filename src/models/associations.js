import User from "./user.js";
import Role from "./role.js";

// Un rol puede tener muchos usuarios, usando la llave foránea `id_user_role`
Role.hasMany(User, {
  foreignKey: "id_user_role",
});

// Un usuario pertenece a un rol, usando la llave foránea `id_user_role`
User.belongsTo(Role, {
  foreignKey: "id_user_role",
});

// Exporta los modelos si lo necesitas, o simplemente deja que se ejecute la asociación
export { User, Role };
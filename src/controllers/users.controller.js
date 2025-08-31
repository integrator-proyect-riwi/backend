import Role from '../models/role.js';
import User from '../models/user.js';

// Crear usuario
export async function createUser(req, res) {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Listar usuarios
export async function getUsers(req, res) {
  try {
    const users = await User.findAll({
      attributes: ['username', 'password', 'email'],
      include: [{
        model: Role,
        as: 'roles',
        attributes: ['name'],
        through: { attributes: [] }
      }],
      where: {is_active: true},
      order: [['id','DESC']]
    });

    const simplifiedUsers = users.map(user => ({
      username: user.username,
      password: user.password,
      email: user.email,
      roles: user.roles.map(r => r.name).join(', ')   // ["Empleado", "Admin"]
    }));

    res.json(simplifiedUsers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

//listar  usuario especifico
export async function getUserById(req, res) {
  try {
    const id = req.params.id
    const user = await User.findOne({
      include: [{
        model: Role,
        as: 'roles',
        attributes: ['name'],
        through: { attributes: [] }
      }],
      where: {
        id: id
      }
    });
    if (!user) {
      res.status(404).json({ message: 'User not found' });
    };
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Editar usuario parcialmente (PATCH)
export async function updateUser(req, res) {
  try {
    const id = req.params.id;

    // Verificar si el usuario existe
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Actualizar solo los campos enviados en el body
    await user.update(req.body);

    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

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
      attributes: ['username', 'passwd', 'email'],
      include: [{
        model: Role,
        as: 'roles',
        attributes: ['name'],
        through: { attributes: [] }
      }]
    });
    res.json(users);
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
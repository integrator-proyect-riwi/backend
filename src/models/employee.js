import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import { baseFields } from './baseModel.js';


const Employee = sequelize.define('employee', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  lastname: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  birthday: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  identification: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
  },
  gender_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'genders',
      key: 'id',
    },
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    },
  },
  contract_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'contracts',
      key: 'id',
    },
  },
  status_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'status',
      key: 'id',
    },
  },
  ...baseFields,
}, {
  tableName: 'employees',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

export default Employee;
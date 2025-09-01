import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import { baseFields } from './baseModel.js';

const Gender = sequelize.define('gender', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(100),
    unique: true,
    allowNull: false,
  },
  codename: {
    type: DataTypes.STRING(100),
    unique: true,
    allowNull: false,
  },
  ...baseFields,
}, {
  tableName: 'genders',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

export default Gender;
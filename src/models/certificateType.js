import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import { baseFields } from './baseModel.js';

const CertificateType = sequelize.define('certificate_type', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(100),
    unique:true,
    allowNull: false,
  },
  codename: {
    type: DataTypes.STRING(100),
    unique:true,
    allowNull: false,
  },
  ...baseFields,
}, {
  tableName: 'certificate_types',
  timestamps: false,
});

export default CertificateType;
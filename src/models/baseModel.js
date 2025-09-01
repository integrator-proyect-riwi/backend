import { DataTypes } from 'sequelize';

export const baseFields = {
  is_active: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
};
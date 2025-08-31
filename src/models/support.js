import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import { baseFields } from './baseModel.js';

const Support = sequelize.define('support', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    documents: {
        type: DataTypes.BLOB,
        allowNull: true,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    observation: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    ...baseFields,
}, {
    tableName: 'supports',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

export default Support;
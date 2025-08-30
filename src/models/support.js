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
    reason: {
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
    timestamps: false,
});

export default Support;
import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import { baseFields } from './baseModel.js';

const CertificateRequest = sequelize.define('certificate_request', {
    request_id: {
        type: DataTypes.INTEGER,   // ✅ CORRECTO
        allowNull: false,
        references: {
            model: 'requests',       // nombre de la tabla padre
            key: 'id',
        },
    },
    certificate_type_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'certificate_types',
            key: 'id',
        },
    },
    ...baseFields,
}, {
    tableName: 'certificate_requests',
    timestamps: false,
});

export default CertificateRequest;
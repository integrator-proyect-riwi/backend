import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import { baseFields } from "./baseModel.js";

const CertificateRequest = sequelize.define("certificate_request", {
    request_id: {
        type: DataTypes.INTEGRER,
        allowNull: false,
    },
    certificate_type_id: {
        type: DataTypes.INTEGRER,
        allowNull: false,
    },
    ...baseFields,
}, {
    tableName: "certificate_requests",
    timestamps: false,
});

export default CertificateRequest;
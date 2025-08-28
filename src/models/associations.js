import Certificates from "./certificates.js";
import Employees from "./employees.js";
import TypesCertificates from "./typesCertificates.js";
import Status from "./status.js";
import Priorities from "./priorities.js";

// Relaciones con Certificates
Certificates.belongsTo(Employees, { foreignKey: "id_employee", as: "employee" });
Employees.hasMany(Certificates, { foreignKey: "id_employee", as: "certificates" });

Certificates.belongsTo(TypesCertificates, { foreignKey: "id_type_certificate", as: "certificateType" });
TypesCertificates.hasMany(Certificates, { foreignKey: "id_type_certificate", as: "certificates" });

Certificates.belongsTo(Status, { foreignKey: "id_status", as: "status" });
Status.hasMany(Certificates, { foreignKey: "id_status", as: "certificates" });

Certificates.belongsTo(Priorities, { foreignKey: "id_priority", as: "priority" });
Priorities.hasMany(Certificates, { foreignKey: "id_priority", as: "certificates" });


export { Certificates, Employees, TypesCertificates, Status, Priorities };
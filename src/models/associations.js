import Role from "./role.js";
import Gender from "./gender.js";
import ContractType from "./contractType.js";
import Occupation from "./occupation.js";
import CertificateType from "./certificateType.js";
import User from "./user.js";
import StatusType from "./statusType.js";
import Status from "./status.js";
import Priority from "./priority.js";
import RequestType from "./requestsType.js";
import Support from "./support.js";
import UserRole from "./userRole.js";
import Department from "./department.js";
import Contract from "./contract.js";
import Employee from "./employee.js";
import Request from "./request.js";
import CertificateRequest from "./certificateRequest.js";

const applyAssociations = () => {

    //User <-> Role (Many-to-Many)
    User.belongsToMany(Role, { through: UserRole, foreignKey: "user_id", as: "roles" });
    Role.belongsToMany(User, { through: UserRole, foreignKey: "role_id", as: "users" });

    // StatusType -> Status (1:N)
    StatusType.hasMany(Status, { foreignKey: "status_type_id", as: "statuses" });
    Status.belongsTo(StatusType, { foreignKey: "status_type_id", as: "status_type" });

    // Department -> Employee (líder) (1:1)
    Department.belongsTo(Employee, { foreignKey: "leader_id", as: "leader" });
    Employee.hasOne(Department, { foreignKey: "leader_id", as: "department_leaded" });

    // ContractType -> Contract (1:N)
    ContractType.hasMany(Contract, { foreignKey: "contract_type_id", as: "contracts" });
    Contract.belongsTo(ContractType, { foreignKey: "contract_type_id", as: "contract_type" });

    // Occupation -> Contract (1:N)
    Occupation.hasMany(Contract, { foreignKey: "occupation_id", as: "contracts" });
    Contract.belongsTo(Occupation, { foreignKey: "occupation_id", as: "occupation" });

    // Department -> Contract (1:N)
    Department.hasMany(Contract, { foreignKey: "department_id", as: "contracts" });
    Contract.belongsTo(Department, { foreignKey: "department_id", as: "department" });

    // Status -> Contract (1:N)
    Status.hasMany(Contract, { foreignKey: "status_id", as: "contracts" });
    Contract.belongsTo(Status, { foreignKey: "status_id", as: "status" });

    // User -> Employee (1:1)
    User.hasOne(Employee, { foreignKey: "user_id", as: "employee" });
    Employee.belongsTo(User, { foreignKey: "user_id", as: "user" });

    // Gender -> Employee (1:N)
    Gender.hasMany(Employee, { foreignKey: "gender_id", as: "employees" });
    Employee.belongsTo(Gender, { foreignKey: "gender_id", as: "gender" });

    // Contract -> Employee (1:N) (opcional)
    Contract.hasMany(Employee, { foreignKey: "contract_id", as: "employees" });
    Employee.belongsTo(Contract, { foreignKey: "contract_id", as: "contract" });

    // Status -> Employee (1:N)
    Status.hasMany(Employee, { foreignKey: "status_id", as: "employees" });
    Employee.belongsTo(Status, { foreignKey: "status_id", as: "status" });

    // Employee -> Request (1:N)
    Employee.hasMany(Request, { foreignKey: "employee_id", as: "requests" });
    Request.belongsTo(Employee, { foreignKey: "employee_id", as: "employee" });

    // RequestType -> Request (1:N)
    RequestType.hasMany(Request, { foreignKey: "request_type_id", as: "requests" });
    Request.belongsTo(RequestType, { foreignKey: "request_type_id", as: "request_type" });

    // Support -> Request (1:N)
    Support.hasMany(Request, { foreignKey: "support_id", as: "requests" });
    Request.belongsTo(Support, { foreignKey: "support_id", as: "support" });

    // Status -> Request (1:N)
    Status.hasMany(Request, { foreignKey: "status_id", as: "requests" });
    Request.belongsTo(Status, { foreignKey: "status_id", as: "status" });

    // Priority -> Request (1:N)
    Priority.hasMany(Request, { foreignKey: "priority_id", as: "requests" });
    Request.belongsTo(Priority, { foreignKey: "priority_id", as: "priority" });

    // Employee (líder) -> Request (1:N)
    Employee.hasMany(Request, { foreignKey: "leader_id", as: "leader_requests" });
    Request.belongsTo(Employee, { foreignKey: "leader_id", as: "leader" });

    // CertificateType <-> Request (Many-to-Many)
    Request.belongsToMany(CertificateType, { through: CertificateRequest, foreignKey: "request_id", as: "certificate_type" });
    CertificateType.belongsToMany(Request, { through: CertificateRequest, foreignKey: "certificate_type_id", as: "request" });
};

export default applyAssociations;
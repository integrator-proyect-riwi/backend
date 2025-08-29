import sequelize from "../config/db";

import Role from "./role.js";
import Gender from "./genders.js";
import ContractType from "./contractType.js";
import Occupation from "./occupation.js";
import CertificateType from "./certificateType.js";
import User from "./user.js";
import StatusType from "./statusType.js";
import Status from "./status.js";
import Priority from "./priority.js";
import RequestType from "./requestType.js";
import Support from "./support.js";
import UserRole from "./userRole.js";
import Department from "./department.js";
import Contract from "./contract.js";
import Employee from "./employee.js";
import Request from "./request.js";
import CertificateRequest from "./certificateRequest.js";

import applyAssociations from "./associations.js";

applyAssociations();
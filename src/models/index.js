import sequelize from '../config/db.js';

import Role from './role.js';
import Gender from './gender.js';
import ContractType from './contractType.js';
import Occupation from './occupation.js';
import CertificateType from './certificateType.js';
import User from './user.js';
import StatusType from './statusType.js';
import Status from './status.js';
import Priority from './priority.js';
import RequestType from './requestsType.js';
import Support from './support.js';
import UserRole from './userRole.js';
import Department from './department.js';
import Contract from './contract.js';
import Employee from './employee.js';
import Request from './request.js';
import CertificateRequest from './certificateRequest.js';

import applyAssociations from './associations.js';

applyAssociations();

const syncDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection established with the database.');

    await sequelize.sync();
    console.log('Tables synchronized correctly.');
  } catch (error) {
    console.error('Error synchronizing database:', error);
  }
};

export {
  sequelize,
  Role,
  Gender,
  ContractType,
  Occupation,
  CertificateType,
  User,
  StatusType,
  Status,
  Priority,
  RequestType,
  Support,
  UserRole,
  Department,
  Contract,
  Employee,
  Request,
  CertificateRequest,
  syncDB,
};
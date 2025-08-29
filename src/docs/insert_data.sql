-- Clean all tables and reset IDs
TRUNCATE TABLE 
    certificate_requests,
    requests,
    user_role,
    employees,
    contracts,
    departments,
    contract_types,
    supports,
    certificate_types,
    request_types,
    priorities,
    users,
    occupations,
    status,
    status_types,
    genders,
    role
RESTART IDENTITY CASCADE;

-- execute INSERTs normally
-- TABLE: role
INSERT INTO role (name, codename) VALUES
('Administrador', 'admin'),
('Empleado', 'employee');

-- TABLE: genders
INSERT INTO genders (name, codename) VALUES
('Masculino', 'male'),
('Femenino', 'female'),
('Otro', 'other');

-- TABLE: status_types
INSERT INTO status_types (name, codename) VALUES
('Estado de Empleado', 'employee_status'),
('Estado de Contrato', 'contract_status'),
('Estado de Solicitud', 'request_status');

-- TABLE: status
INSERT INTO status (name, codename, status_type_id) VALUES
('Activo', 'active', 1),
('Inactivo', 'inactive', 1),
('Pendiente', 'pending', 3),
('Aprobado', 'approved', 3),
('Rechazado', 'rejected', 3),
('Vigente', 'in_effect', 2),
('Terminado', 'terminated', 2);

-- TABLE: occupations
INSERT INTO occupations (name, codename) VALUES
('Ingeniero de Software', 'software_engineer'),
('Analista de Datos', 'data_analyst'),
('Diseñador UX/UI', 'ux_ui_designer'),
('Gerente de Proyectos', 'project_manager');

-- TABLE: users
INSERT INTO users (username, passwd, email) VALUES
('jdoe', 'pass123', 'jdoe@example.com'),
('asmith', 'pass456', 'asmith@example.com'),
('mmartinez', 'pass789', 'mmartinez@example.com'),
('lgarcia', 'pass000', 'lgarcia@example.com'),
('admin', 'admin123', 'admin@empresa.com');

-- TABLE: priorities
INSERT INTO priorities (name, codename) VALUES
('Baja', 'low'),
('Media', 'medium'),
('Alta', 'high'),
('Urgente', 'urgent');

-- TABLE: request_types
INSERT INTO request_types (name, codename) VALUES
('Solicitud de Certificado', 'certificate_request'),
('Solicitud de Licencia', 'leave_request'),
('Solicitud de Vacaciones', 'vacation_request');

-- TABLE: certificate_types
INSERT INTO certificate_types (name, codename) VALUES
('Certificado de Empleo', 'employment_certificate'),
('Certificado de Ingresos', 'income_certificate');

-- TABLE: supports
INSERT INTO supports (documents, reason, observation) VALUES
(E'\\x', 'Necesito un certificado para el banco.', 'Sin observaciones'),
(E'\\x', 'Solicito permiso por motivos personales.', 'Urgente');

-- TABLE: contract_types
INSERT INTO contract_types (name, codename) VALUES
('Tiempo completo', 'full_time'),
('Medio tiempo', 'part_time'),
('Temporal', 'temporary');

-- TABLE: departments
INSERT INTO departments (name, codename, leader_id) VALUES
('Departamento de Ingeniería', 'engineering_dept', NULL),
('Departamento de RRHH', 'hr_dept', NULL),
('Departamento de Marketing', 'marketing_dept', NULL);

-- TABLE: contracts
INSERT INTO contracts (start_date, end_date, retire_date, status_id, contract_type_id, department_id, occupation_id, responsibilities, salary) VALUES
('2023-01-15', NULL, NULL, 6, 1, 1, 1, 'Desarrollo de software', 50000.00),
('2023-03-20', NULL, NULL, 6, 1, 2, 2, 'Análisis de datos de personal', 45000.00),
('2023-05-10', NULL, NULL, 6, 2, 3, 3, 'Diseño de campañas', 35000.00);

-- TABLE: employees
INSERT INTO employees (name, lastname, birthday, identification, gender_id, user_id, contract_id, status_id) VALUES
('John', 'Doe', '1990-05-25', '123456789', 1, 1, 1, 1),
('Anne', 'Smith', '1985-11-12', '987654321', 2, 2, 2, 1),
('Maria', 'Martinez', '1992-02-28', '112233445', 2, 3, 3, 1),
('Luis', 'Garcia', '1995-07-01', '556677889', 1, 4, 1, 1);

-- We update department leaders now that there are employees
UPDATE departments SET leader_id = 1 WHERE id = 1;
UPDATE departments SET leader_id = 2 WHERE id = 2;
UPDATE departments SET leader_id = 3 WHERE id = 3;

-- TABLE: user_role
INSERT INTO user_role (user_id, role_id) VALUES
(1, 1), -- jdoe es Administrador
(2, 2), -- asmith es Empleado
(3, 2), -- mmartinez es Empleado
(4, 2), -- lgarcia es Empleado
(5, 1); -- admin es Administrado

-- TABLE: reuqests
INSERT INTO requests (code, employee_id, request_type_id, support_id, status_id, priority_id, leader_id, start_date, end_date) VALUES
('SOL-001', 2, 3, 2, 3, 2, 2, '2025-10-15', '2025-10-26'),
('SOL-002', 3, 3, 1, 3, 1, 1, '2025-09-15', '2025-09-25'),
('SOL-003', 1, 1, 1, 4, 2, 2, '2025-08-01', '2025-08-01'),
('SOL-004', 4, 2, 2, 3, 4, 3, '2025-09-10', '2025-09-15'),
('SOL-005', 2, 3, 2, 5, 3, 1, '2025-10-01', '2025-10-10'),
('SOL-006', 1, 1, 1, 4, 1, 2, '2025-07-15', '2025-07-15');

INSERT INTO certificate_requests (request_id, certificate_type_id) VALUES
(3, 1),
(6, 2);
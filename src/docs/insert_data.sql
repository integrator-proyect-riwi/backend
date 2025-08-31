-- limpiar todas las tablas y reiniciar IDs
TRUNCATE TABLE certificate_requests,
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
role RESTART IDENTITY CASCADE;

-- insertar roles
INSERT INTO role (name, codename)
VALUES
    ('administrator', 'admin'),
    ('employee', 'employee');

-- insertar géneros
INSERT INTO genders (name, codename)
VALUES
    ('male', 'male'),
    ('female', 'female'),
    ('other', 'other');

-- insertar tipos de estado
INSERT INTO status_types (name, codename)
VALUES
    ('employee_status', 'employee_status'),
    ('contract_status', 'contract_status'),
    ('request_status', 'request_status');

-- insertar estados
INSERT INTO status (name, codename, status_type_id)
VALUES
    ('active', 'active', 1),
    ('inactive', 'inactive', 1),
    ('pending', 'pending', 3),
    ('approved', 'approved', 3),
    ('rejected', 'rejected', 3),
    ('current', 'current', 2),
    ('finalized', 'finalized', 2);

-- insertar ocupaciones
INSERT INTO occupations (name, codename)
VALUES
    ('software_engineer', 'software_engineer'),
    ('data_analyst', 'data_analyst'),
    ('ux_ui_designer', 'ux_ui_designer'),
    ('project_manager', 'project_manager');

-- table: users
INSERT INTO
    users (username, password, email)
VALUES
    ('admin', '$2b$10$W6QRfupqvreMFgNyjP2ya.qIPf9maz2svCclkuZIKbIWLwj4wYV/a', 'admin@enterprise.com'), -- password: admin123
    ('employee', '$2b$10$n1CU49p7HVNPKB4tF13oOOwQa/IieFY1SxpEyRWiwQrGh69Cw9cTO', 'employee@enterprise.com'), -- password: empleado123
    ('jdoe', '$2b$10$Epgc5WFtDA5IjzuNdCbO2umKqxxm9KX.2w6uJ4GZZDJ/KX/y35pHC', 'jdoe@example.com'), -- password: pass123
    ('asmith', '$2b$10$Set.I/6tFki3KORLz2TCmeR65protBkQ7wfCz7RNetbDjsz5fQr5G', 'asmith@example.com'), -- password: pass456
    ('mmartinez', '$2b$10$cIVw6XLVEbMu50.UTLOQDuNlouO8YkwEDZ8wmjK7mFqM2jOj9on/G', 'mmartinez@example.com'), -- password: pass789
    ('lgarcia', '$2b$10$uiDLeXdTqxiN/uVeriYwxOWzc2upGRSfb0nl2PgPMJu2K9iQnUj/O', 'lgarcia@example.com'); -- password: pass000

-- insertar prioridades
INSERT INTO priorities (name, codename)
VALUES
    ('normal', 'normal'),
    ('urgent', 'urgent');

-- insertar tipos de solicitud
INSERT INTO request_types (name, codename)
VALUES
    ('vacations', 'vacations'),
    ('medical_permit', 'medical_permit'),
    ('p_m_leave', 'p/m_leave'),
    ('schedule_change', 'schedule_change'),
    ('personal_permit', 'personal_permit'),
    ('training_leave', 'training_leave'),
    ('compensatory_day', 'compensatory_day');

-- insertar tipos de certificado
INSERT INTO certificate_types (name, codename)
VALUES
    ('employment_certificate', 'employment_certificate'),
    ('income_certificate', 'income_certificate');

-- insertar soportes
INSERT INTO supports (documents, description, observation)
VALUES
    (E'\\x', 'i need a certificate for the bank.', 'no observations'),
    (E'\\x', 'i request permission for personal reasons.', 'urgent');

-- insertar tipos de contrato
INSERT INTO contract_types (name, codename)
VALUES
    ('full_time', 'full_time'),
    ('half_time', 'half_time'),
    ('part_time', 'part_time');

-- insertar departamentos
INSERT INTO departments (name, codename, leader_id)
VALUES
    ('engineering_department', 'engineering_dept', NULL),
    ('hr_department', 'hr_dept', NULL),
    ('marketing_department', 'marketing_dept', NULL);

-- insertar contratos
INSERT INTO contracts (start_date, end_date, retire_date, status_id, contract_type_id, department_id, occupation_id, responsibilities, salary)
VALUES
    ('2023-01-15', NULL, NULL, 6, 1, 1, 1, 'software development', 50000.00),
    ('2023-03-20', NULL, NULL, 6, 1, 2, 2, 'personnel data analysis', 45000.00),
    ('2023-05-10', NULL, NULL, 6, 2, 3, 3, 'campaign design', 35000.00);

-- insertar empleados
INSERT INTO employees (name, lastname, birthday, identification, gender_id, user_id, contract_id, status_id)
VALUES
    ('john', 'doe', '1990-05-25', '123456789', 1, 1, 1, 1),
    ('anne', 'smith', '1985-11-12', '987654321', 2, 2, 2, 1),
    ('maria', 'martinez', '1992-02-28', '112233445', 2, 3, 3, 1),
    ('luis', 'garcia', '1995-07-01', '556677889', 1, 4, 1, 1),
    ('employee', 'employee', '1980-01-01', '222222222', 3, 6, 1, 1);

-- actualizar líderes de departamento
UPDATE departments SET leader_id = 1 WHERE id = 1;
UPDATE departments SET leader_id = 2 WHERE id = 2;
UPDATE departments SET leader_id = 3 WHERE id = 3;

-- insertar roles de usuario
INSERT INTO user_role (user_id, role_id)
VALUES
    (1, 1),
    (2, 2),
    (3, 2),
    (4, 2),
    (5, 2),
    (6, 2);

-- insertar solicitudes
INSERT INTO requests (code, employee_id, request_type_id, support_id, status_id, priority_id, leader_id, start_date, end_date)
VALUES
    ('sol-001', 2, 3, 2, 3, 2, 2, '2025-10-15', '2025-10-26'),
    ('sol-002', 3, 3, 1, 3, 1, 1, '2025-09-15', '2025-09-25'),
    ('sol-003', 1, 1, 1, 4, 2, 2, '2025-08-01', '2025-08-01'),
    ('sol-004', 4, 2, 2, 3, 1, 3, '2025-09-10', '2025-09-15'),
    ('sol-005', 2, 3, 2, 5, 1, 1, '2025-10-01', '2025-10-10'),
    ('sol-006', 1, 1, 1, 4, 1, 2, '2025-07-15', '2025-07-15');

-- insertar solicitudes de certificados
INSERT INTO certificate_requests (request_id, certificate_type_id)
VALUES
    (3, 1),
    (6, 2);

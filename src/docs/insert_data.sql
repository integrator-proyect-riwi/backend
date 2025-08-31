-- =========================
-- LIMPIEZA DE TABLAS
-- =========================
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

-- =========================
-- ROLES
-- =========================
INSERT INTO role (name, codename, created_at, updated_at)
VALUES
    ('Administrator', 'admin', NOW(), NOW()),
    ('Employee', 'employee', NOW(), NOW());

-- =========================
-- GÉNEROS
-- =========================
INSERT INTO genders (name, codename, created_at, updated_at)
VALUES
    ('Male', 'male', NOW(), NOW()),
    ('Female', 'female', NOW(), NOW()),
    ('Other', 'other', NOW(), NOW());

-- =========================
-- TIPOS DE ESTADO
-- =========================
INSERT INTO status_types (name, codename, created_at, updated_at)
VALUES
    ('Employee Status', 'employee_status', NOW(), NOW()),
    ('Contract Status', 'contract_status', NOW(), NOW()),
    ('Request Status', 'request_status', NOW(), NOW());

-- =========================
-- ESTADOS
-- =========================
INSERT INTO status (name, codename, status_type_id, created_at, updated_at)
VALUES
    ('Active', 'active', 1, NOW(), NOW()),
    ('Inactive', 'inactive', 1, NOW(), NOW()),
    ('Pending', 'pending', 3, NOW(), NOW()),
    ('Approved', 'approved', 3, NOW(), NOW()),
    ('Rejected', 'rejected', 3, NOW(), NOW()),
    ('Current', 'current', 2, NOW(), NOW()),
    ('Finalized', 'finalized', 2, NOW(), NOW());

-- =========================
-- OCUPACIONES
-- =========================
INSERT INTO occupations (name, codename, created_at, updated_at)
VALUES
    ('Software Engineer', 'software_engineer', NOW(), NOW()),
    ('Data Analyst', 'data_analyst', NOW(), NOW()),
    ('UX/UI Designer', 'ux_ui_designer', NOW(), NOW()),
    ('Project Manager', 'project_manager', NOW(), NOW());

-- =========================
-- USUARIOS
-- =========================
INSERT INTO users (username, password, email, created_at, updated_at)
VALUES
    ('admin', '$2b$10$W6QRfupqvreMFgNyjP2ya.qIPf9maz2svCclkuZIKbIWLwj4wYV/a', 'admin@enterprise.com', NOW(), NOW()), -- admin123
    ('employee', '$2b$10$n1CU49p7HVNPKB4tF13oOOwQa/IieFY1SxpEyRWiwQrGh69Cw9cTO', 'employee@enterprise.com', NOW(), NOW()), -- empleado123
    ('jdoe', '$2b$10$Epgc5WFtDA5IjzuNdCbO2umKqxxm9KX.2w6uJ4GZZDJ/KX/y35pHC', 'jdoe@example.com', NOW(), NOW()), -- pass123
    ('asmith', '$2b$10$Set.I/6tFki3KORLz2TCmeR65protBkQ7wfCz7RNetbDjsz5fQr5G', 'asmith@example.com', NOW(), NOW()), -- pass456
    ('mmartinez', '$2b$10$cIVw6XLVEbMu50.UTLOQDuNlouO8YkwEDZ8wmjK7mFqM2jOj9on/G', 'mmartinez@example.com', NOW(), NOW()), -- pass789
    ('lgarcia', '$2b$10$uiDLeXdTqxiN/uVeriYwxOWzc2upGRSfb0nl2PgPMJu2K9iQnUj/O', 'lgarcia@example.com', NOW(), NOW()); -- pass000

-- =========================
-- PRIORIDADES
-- =========================
INSERT INTO priorities (name, codename, created_at, updated_at)
VALUES
    ('Normal', 'normal', NOW(), NOW()),
    ('Urgent', 'urgent', NOW(), NOW());

-- =========================
-- TIPOS DE SOLICITUD
-- =========================
INSERT INTO request_types (name, codename, created_at, updated_at)
VALUES
    ('Vacations', 'vacations', NOW(), NOW()),
    ('Medical Permit', 'medical_permit', NOW(), NOW()),
    ('Parental Leave', 'p_m_leave', NOW(), NOW()),
    ('Schedule Change', 'schedule_change', NOW(), NOW()),
    ('Personal Permit', 'personal_permit', NOW(), NOW()),
    ('Training Leave', 'training_leave', NOW(), NOW()),
    ('Compensatory Day', 'compensatory_day', NOW(), NOW());

-- =========================
-- TIPOS DE CERTIFICADO
-- =========================
INSERT INTO certificate_types (name, codename, created_at, updated_at)
VALUES
    ('Employment Certificate', 'employment_certificate', NOW(), NOW()),
    ('Income Certificate', 'income_certificate', NOW(), NOW());

-- =========================
-- SOPORTES
-- =========================
INSERT INTO supports (documents, description, observation, created_at, updated_at)
VALUES
    (E'\\x', 'I need a certificate for the bank.', 'No observations', NOW(), NOW()),
    (E'\\x', 'I request permission for personal reasons.', 'Urgent', NOW(), NOW());

-- =========================
-- TIPOS DE CONTRATO
-- =========================
INSERT INTO contract_types (name, codename, created_at, updated_at)
VALUES
    ('Full-time', 'full_time', NOW(), NOW()),
    ('Half-time', 'half_time', NOW(), NOW()),
    ('Part-time', 'part_time', NOW(), NOW());

-- =========================
-- DEPARTAMENTOS
-- =========================
INSERT INTO departments (name, codename, leader_id, created_at, updated_at)
VALUES
    ('Engineering Department', 'engineering_dept', NULL, NOW(), NOW()),
    ('HR Department', 'hr_dept', NULL, NOW(), NOW()),
    ('Marketing Department', 'marketing_dept', NULL, NOW(), NOW());

-- =========================
-- CONTRATOS
-- =========================
INSERT INTO contracts (start_date, end_date, retire_date, status_id, contract_type_id, department_id, occupation_id, responsibilities, salary, created_at, updated_at)
VALUES
    ('2023-01-15', NULL, NULL, 6, 1, 1, 1, 'Software development', 50000.00, NOW(), NOW()),
    ('2023-03-20', NULL, NULL, 6, 1, 2, 2, 'Personnel data analysis', 45000.00, NOW(), NOW()),
    ('2023-05-10', NULL, NULL, 6, 2, 3, 3, 'Campaign design', 35000.00, NOW(), NOW());

-- =========================
-- EMPLEADOS
-- =========================
INSERT INTO employees (name, lastname, birthday, identification, gender_id, user_id, contract_id, status_id, created_at, updated_at)
VALUES
    ('John', 'Doe', '1990-05-25', '123456789', 1, 1, 1, 1, NOW(), NOW()),
    ('Anne', 'Smith', '1985-11-12', '987654321', 2, 2, 2, 1, NOW(), NOW()),
    ('Maria', 'Martinez', '1992-02-28', '112233445', 2, 3, 3, 1, NOW(), NOW()),
    ('Luis', 'Garcia', '1995-07-01', '556677889', 1, 4, 1, 1, NOW(), NOW()),
    ('Employee', 'Employee', '1980-01-01', '222222222', 3, 6, 1, 1, NOW(), NOW());

-- =========================
-- ACTUALIZAR LÍDERES DE DEPARTAMENTO
-- =========================
UPDATE departments SET leader_id = 1 WHERE id = 1;
UPDATE departments SET leader_id = 2 WHERE id = 2;
UPDATE departments SET leader_id = 3 WHERE id = 3;

-- =========================
-- ROLES DE USUARIO
-- =========================
INSERT INTO user_role (user_id, role_id, created_at, updated_at)
VALUES
    (1, 1, NOW(), NOW()),
    (2, 2, NOW(), NOW()),
    (3, 2, NOW(), NOW()),
    (4, 2, NOW(), NOW()),
    (5, 2, NOW(), NOW()),
    (6, 2, NOW(), NOW());

-- =========================
-- SOLICITUDES
-- =========================
INSERT INTO requests (code, employee_id, request_type_id, support_id, status_id, priority_id, leader_id, start_date, end_date, created_at, updated_at)
VALUES
    ('sol-001', 2, 3, 2, 3, 2, 2, '2025-10-15', '2025-10-26', NOW(), NOW()),
    ('sol-002', 3, 3, 1, 3, 1, 1, '2025-09-15', '2025-09-25', NOW(), NOW()),
    ('sol-003', 1, 1, 1, 4, 2, 2, '2025-08-01', '2025-08-01', NOW(), NOW()),
    ('sol-004', 4, 2, 2, 3, 1, 3, '2025-09-10', '2025-09-15', NOW(), NOW()),
    ('sol-005', 2, 3, 2, 5, 1, 1, '2025-10-01', '2025-10-10', NOW(), NOW()),
    ('sol-006', 1, 1, 1, 4, 1, 2, '2025-07-15', '2025-07-15', NOW(), NOW());

-- =========================
-- SOLICITUDES DE CERTIFICADOS
-- =========================
INSERT INTO certificate_requests (request_id, certificate_type_id, created_at, updated_at)
VALUES
    (3, 1, NOW(), NOW()),
    (6, 2, NOW(), NOW());

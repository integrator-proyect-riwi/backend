-- Limpiar todas las tablas y reiniciar IDs
TRUNCATE TABLE 
    vacations,
    certificates_requests,
    custom_requests,
    supports,
    employees,
    contracts,
    admins,
    users,
    users_role,
    genders,
    status,
    types_status,
    departments,
    occupations,
    types_requests,
    types_certificates,
    types_contracts,
    priorities
RESTART IDENTITY CASCADE;

-- Aquí ya puedes ejecutar tus INSERTs normalmente
-- 1) Roles
INSERT INTO users_role (name, codename) VALUES
('Administrator', 'admin'),
('Employee', 'employee');

-- 2) Géneros
INSERT INTO genders (name, codename) VALUES
('Male', 'M'),
('Female', 'F');

-- 3) Tipos de estado
INSERT INTO types_status (name, codename) VALUES
('General', 'general'),
('Contract', 'contract'),
('Request', 'request');

-- 4) Estados
INSERT INTO status (name, codename, id_types_status) VALUES
('Active', 'active', 1),
('Rejected', 'rejected', 1),
('Pending', 'pending', 3),
('Approved', 'approved', 3),
('Under Review', 'under', 2);

-- 5) Ocupaciones
INSERT INTO occupations (name, codename) VALUES
('Software Engineer', 'sw_eng'),
('HR Specialist', 'hr_spec'),
('Analyst', 'analyst'),
('Manager', 'manager'),
('Marketing Specialist', 'mkt_spec'),
('Customer Support Agent', 'cs_agent'),
('Project Manager', 'proj_mgr');

-- 6) Usuarios
INSERT INTO users (username, passwd, email, id_user_role) VALUES
('emp02', '123456', 'emp02@company.com', 2),
('emp03', '123456', 'emp03@company.com', 2),
('emp04', '123456', 'emp04@company.com', 2),
('emp05', '123456', 'emp05@company.com', 2),
('emp06', '123456', 'emp06@company.com', 2),
('emp07', '123456', 'emp07@company.com', 2),
('emp08', '123456', 'emp08@company.com', 2),
('emp09', '123456', 'emp09@company.com', 2),
('emp10', '123456', 'emp10@company.com', 2),
('emp11', '123456', 'emp11@company.com', 2);

-- 7) Empleados
INSERT INTO employees (name, lastname, birthday, identification, id_gender, id_user, id_status) VALUES
('Alice', 'Smith', '1988-03-12', 'CC23456', 2, 1,  1),     -- HR
('Bob', 'Johnson', '1992-07-22', 'CC34567', 1, 2, 1),     -- IT
('Carol', 'Williams', '1995-11-30', 'CC45678', 2, 3, 1),  -- Finance
('David', 'Brown', '1990-01-18', 'CC56789', 1, 4, 1),     -- IT
('Eve', 'Jones', '1986-09-09', 'CC67890', 2, 5, 1),       -- Marketing
('Frank', 'Garcia', '1991-04-25', 'CC78901', 1, 6, 1),    -- Support
('Grace', 'Martinez', '1993-06-14', 'CC89012', 2, 7, 1),  -- HR
('Hank', 'Davis', '1989-12-05', 'CC90123', 1, 8,1),     -- IT
('Ivy', 'Rodriguez', '1994-02-17', 'CC01234', 2, 9, 1),  -- Finance
('Jack', 'Lopez', '1987-08-03', 'CC12346', 1, 10, 1);     -- Marketing

-- 8) Departamentos
INSERT INTO departments (name, codename, id_employee) VALUES
('Human Resources', 'hr',1),
('IT Department', 'it',2),
('Finance', 'finance',3),
('Marketing', 'marketing',4),
('Customer Support', 'support',5);

-- 9) Types-contract
INSERT INTO types_contracts (name, codename) VALUES
('Fixed term contract', 'fixed'),
('Contract for work or labor', 'labor'),
('Learning contract', 'learn'),
('Occasional, accidental or transitory contract','transitory'),
('Indefinite-term contract', 'indefinite');

-- 10) Contratos
INSERT INTO contracts (start_date, end_date, id_status, id_type_contract, id_department, id_occupation, responsibilities, salary) VALUES
('2024-02-01', '2025-01-31', 1, 5, 1, 2, 'Handle employee onboarding and relations', 2800.00),       -- Alice (HR Specialist)
('2023-05-01', '2025-04-30', 1, 1, 2, 1, 'Develop backend APIs', 4000.00),                            -- Bob (Software Engineer)
('2024-03-15', '2024-12-15', 1, 2, 3, 3, 'Create financial dashboards', 3000.00),                     -- Carol (Analyst)
('2024-01-01', '2024-12-31', 1, 1, 2, 1, 'Maintain legacy systems', 3700.00),                         -- David (Software Engineer)
('2024-06-01', '2025-05-31', 1, 5, 4, 5, 'Manage social media campaigns', 3100.00),                   -- Eve (Marketing Specialist)
('2024-04-01', '2024-09-30', 1, 4, 5, 6, 'Provide customer support and resolve tickets', 2600.00),    -- Frank (CS Agent)
('2024-01-10', '2025-01-09', 1, 5, 1, 4, 'Lead HR strategy and operations', 4500.00),                 -- Grace (Manager)
('2024-05-01', '2025-04-30', 1, 1, 2, 1, 'Develop and maintain internal apps', 3900.00),              -- Hank (Software Engineer)
('2023-11-01', '2024-10-31', 1, 3, 3, 3, 'Support finance reporting', 2500.00),                       -- Ivy (Analyst)
('2024-07-01', '2025-06-30', 1, 5, 4, 7, 'Coordinate marketing projects', 4300.00);                   -- Jack (Project Manager)


-- 11) Prioridades (para requests, vacations, etc.)
INSERT INTO priorities (name, codename) VALUES
('High', 'high'),
('Medium', 'medium'),
('Low', 'low');

-- 12) Soportes (para solicitudes)
INSERT INTO supports (documents, description) VALUES
(E'\\xDEADBEEF', 'Sample PDF file'),
(E'\\xCAFEBABE', 'Medical certificate');

-- 13) Soportes (para solicitudes)
INSERT INTO types_requests (name, codename) VALUES
('Vacation Request', 'vacation'),
('Certificate Request', 'certificate'),
('Schedule Change', 'schedule_change'),
('Medical Leave', 'medical_leave'),
('Remote Work Request', 'remote_work');

-- 14) Solicitudes personalizadas
INSERT INTO custom_requests (id_employee, id_type_request, id_support, id_status, id_priority, start_date, end_date)
VALUES
(1, 1, 1, 1, 1, '2024-02-01', '2024-02-10'),
(2, 1, 1, 1, 2, '2024-06-01', '2024-06-10'),
(3, 2, 2, 3, 1, '2024-07-01', '2024-07-01'),
(4, 4, 2, 4, 1, '2024-05-15', '2024-05-20'),
(5, 5, 1, 1, 3, '2024-08-01', '2024-08-05');

-- 15). Tipos de certificados
INSERT INTO types_certificates (name, codename) VALUES
('Employment Certificate', 'employment'),
('Salary Certificate', 'salary');

-- 16). admins
INSERT INTO admins (name, lastname, id_user) VALUES
('Carlos', 'Gomez', 1);

-- 17) Solicitudes certificadas
INSERT INTO certificates_requests (id_employee, id_type_certificate, id_status, id_priority)
VALUES
(1, 1, 3, 2),
(6, 1, 3, 1),
(7, 2, 1, 2),
(8, 1, 4, 2),
(9, 2, 1, 3);

-- 18) Vacaciones
INSERT INTO vacations (id_employee, description, start_date, end_date, id_status, id_priority)
VALUES
(1, 'Vacaciones anuales', '2023-12-01', '2023-12-15', 1, 2),
(2, 'Vacaciones personales', '2024-12-01', '2024-12-15', 1, 2),
(3, 'Descanso post-proyecto', '2024-10-05', '2024-10-12', 3, 1),
(4, 'Viaje familiar', '2024-11-20', '2024-11-30', 1, 1),
(5, 'Vacaciones anuales', '2024-09-01', '2024-09-10', 4, 3),
(6, 'Vacaciones pendientes', '2023-09-01', '2023-09-10', 3, 3);


-- Clean all tables and reset IDs
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

-- execute INSERTs normally
-- TABLE: role
INSERT INTO
    role (name, codename)
VALUES
    ('Administrator', 'admin'),
    ('Employee', 'employee');

-- TABLE: genders
INSERT INTO
    genders (name, codename)
VALUES
    ('Male', 'male'),
    ('Female', 'female'),
    ('Other', 'other');

-- TABLE: status_types
INSERT INTO
    status_types (name, codename)
VALUES
    ('Employee Status', 'employee_status'),
    ('Contract Status', 'contract_status'),
    ('Application Status', 'request_status');

-- TABLE: status
INSERT INTO
    status (name, codename, status_type_id)
VALUES
    ('Active', 'active', 1),
    ('Inactive', 'inactive', 1),
    ('Pending', 'pending', 3),
    ('Approved', 'approved', 3),
    ('Rejected', 'rejected', 3),
    ('Current', 'current', 2),
    ('Finalized', 'finalized', 2);

-- TABLE: occupations
INSERT INTO
    occupations (name, codename)
VALUES
    ('Software Engineer', 'software_engineer'),
    ('Data Analyst', 'data_analyst'),
    ('UX/UI Designer', 'ux_ui_designer'),
    ('Project Manager', 'project_manager');

-- TABLE: users
INSERT INTO
    users (username, passwd, email)
VALUES
    (
        'admin',
        '$2b$10$W6QRfupqvreMFgNyjP2ya.qIPf9maz2svCclkuZIKbIWLwj4wYV/a',
        'admin@enterprise.com'
    ),
    --paswd: admin123
    (
        'employee',
        '$2b$10$n1CU49p7HVNPKB4tF13oOOwQa/IieFY1SxpEyRWiwQrGh69Cw9cTO',
        'employee@enterprise.com'
    ),
    --paswd: empleado123
    (
        'jdoe',
        '$2b$10$Epgc5WFtDA5IjzuNdCbO2umKqxxm9KX.2w6uJ4GZZDJ/KX/y35pHC',
        'jdoe@example.com'
    ),
    --passwd: pass123
    (
        'asmith',
        '$2b$10$Set.I/6tFki3KORLz2TCmeR65protBkQ7wfCz7RNetbDjsz5fQr5G',
        'asmith@example.com'
    ),
    --paswd: pass456
    (
        'mmartinez',
        '$2b$10$cIVw6XLVEbMu50.UTLOQDuNlouO8YkwEDZ8wmjK7mFqM2jOj9on/G',
        'mmartinez@example.com'
    ),
    --paswd: pass789
    (
        'lgarcia',
        '$2b$10$uiDLeXdTqxiN/uVeriYwxOWzc2upGRSfb0nl2PgPMJu2K9iQnUj/O',
        'lgarcia@example.com'
    );

--paswd: pass000
-- TABLE: priorities
INSERT INTO
    priorities (name, codename)
VALUES
    ('Normal', 'normal'),
    ('Urgent', 'urgent');

-- TABLE: request_types
INSERT INTO
    request_types (name, codename)
VALUES
    ('Vacations', 'vacations'),
    ('Medical Permit', 'medical_permit'),
    ('Paternity/Maternity Leave', 'p/m_leave'),
    ('Schedule Change', 'schedule_change'),
    ('Personal Permit', 'personal_permit'),
    ('Training Leave', 'training_leave'),
    ('Compensatory Day', 'compensatory_day');

-- TABLE: certificate_types
INSERT INTO
    certificate_types (name, codename)
VALUES
    (
        'Employment Certificate',
        'employment_certificate'
    ),
    ('Certificate of Income', 'income_certificate');

-- TABLE: supports
INSERT INTO
    supports (documents, description, observation)
VALUES
    (
        E'\\x',
        'I need a certificate for the bank.',
        'No observations'
    ),
    (
        E'\\x',
        'I request permission for personal reasons.',
        'Urgent'
    );

-- TABLE: contract_types
INSERT INTO
    contract_types (name, codename)
VALUES
    ('Full time', 'full_time'),
    ('Half-time', 'half_time'),
    ('Part time', 'part_time');

-- TABLE: departments
INSERT INTO
    departments (name, codename, leader_id)
VALUES
    (
        'Engineering Department',
        'engineering_dept',
        NULL
    ),
    ('HR Department', 'hr_dept', NULL),
    ('Marketing Department', 'marketing_dept', NULL);

-- TABLE: contracts
INSERT INTO
    contracts (
        start_date,
        end_date,
        retire_date,
        status_id,
        contract_type_id,
        department_id,
        occupation_id,
        responsibilities,
        salary
    )
VALUES
    (
        '2023-01-15',
        NULL,
        NULL,
        6,
        1,
        1,
        1,
        'Software development',
        50000.00
    ),
    (
        '2023-03-20',
        NULL,
        NULL,
        6,
        1,
        2,
        2,
        'Personnel data analysis',
        45000.00
    ),
    (
        '2023-05-10',
        NULL,
        NULL,
        6,
        2,
        3,
        3,
        'Campaign design',
        35000.00
    );

-- TABLE: employees
INSERT INTO
    employees (
        name,
        lastname,
        birthday,
        identification,
        gender_id,
        user_id,
        contract_id,
        status_id
    )
VALUES
    (
        'John',
        'Doe',
        '1990-05-25',
        '123456789',
        1,
        1,
        1,
        1
    ),
    (
        'Anne',
        'Smith',
        '1985-11-12',
        '987654321',
        2,
        2,
        2,
        1
    ),
    (
        'Maria',
        'Martinez',
        '1992-02-28',
        '112233445',
        2,
        3,
        3,
        1
    ),
    (
        'Luis',
        'Garcia',
        '1995-07-01',
        '556677889',
        1,
        4,
        1,
        1
    ),
    (
        'employee',
        'employee',
        '1980-01-01',
        '222222222',
        3,
        6,
        1,
        1
    );

-- We update department leaders now that there are employees
UPDATE
    departments
SET
    leader_id = 1
WHERE
    id = 1;

UPDATE
    departments
SET
    leader_id = 2
WHERE
    id = 2;

UPDATE
    departments
SET
    leader_id = 3
WHERE
    id = 3;

-- TABLE: user_role
INSERT INTO
    user_role (user_id, role_id)
VALUES
    (1, 1),
    -- admin is Administrator
    (2, 2),
    -- employee is Employee
    (3, 2),
    -- jdoe is Employee
    (4, 2),
    -- asmith is Employee
    (5, 2),
    -- mmartinez is Employee
    (6, 2);

-- lgarcia is Employee
-- TABLE: reuqests
INSERT INTO
    requests (
        code,
        employee_id,
        request_type_id,
        support_id,
        status_id,
        priority_id,
        leader_id,
        start_date,
        end_date
    )
VALUES
    (
        'SOL-001',
        2,
        3,
        2,
        3,
        2,
        2,
        '2025-10-15',
        '2025-10-26'
    ),
    (
        'SOL-002',
        3,
        3,
        1,
        3,
        1,
        1,
        '2025-09-15',
        '2025-09-25'
    ),
    (
        'SOL-003',
        1,
        1,
        1,
        4,
        2,
        2,
        '2025-08-01',
        '2025-08-01'
    ),
    (
        'SOL-004',
        4,
        2,
        2,
        3,
        1,
        3,
        '2025-09-10',
        '2025-09-15'
    ),
    (
        'SOL-005',
        2,
        3,
        2,
        5,
        1,
        1,
        '2025-10-01',
        '2025-10-10'
    ),
    (
        'SOL-006',
        1,
        1,
        1,
        4,
        1,
        2,
        '2025-07-15',
        '2025-07-15'
    );

INSERT INTO
    certificate_requests (request_id, certificate_type_id)
VALUES
    (3, 1),
    (6, 2);
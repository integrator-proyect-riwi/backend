-- Delete tables in safe order---
DROP TABLE IF EXISTS base_table CASCADE;
DROP TABLE IF EXISTS certificate_requests CASCADE;
DROP TABLE IF EXISTS priorities CASCADE;
DROP TABLE IF EXISTS supports CASCADE;
DROP TABLE IF EXISTS employees CASCADE;
DROP TABLE IF EXISTS contracts CASCADE;
DROP TABLE IF EXISTS requests CASCADE;
DROP TABLE IF EXISTS departments CASCADE;
DROP TABLE IF EXISTS contract_types CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS user_role CASCADE;
DROP TABLE IF EXISTS role CASCADE;
DROP TABLE IF EXISTS certificate_types CASCADE;
DROP TABLE IF EXISTS request_types CASCADE;
DROP TABLE IF EXISTS occupations CASCADE;
DROP TABLE IF EXISTS status CASCADE;
DROP TABLE IF EXISTS types_status CASCADE;
DROP TABLE IF EXISTS genders CASCADE;

-------- Fields that all tables will inherit --------
CREATE TABLE base_table(
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-------- TABLE: role --------
CREATE TABLE role (
    id SERIAL PRIMARY KEY,
    name VARCHAR (100) NOT NULL UNIQUE,
    codename VARCHAR (100) NOT NULL UNIQUE
) INHERITS (base_table);

-------- TABLE: genders --------
CREATE TABLE genders (
    id SERIAL PRIMARY KEY,
    name VARCHAR (100) NOT NULL UNIQUE,
    codename VARCHAR (100) NOT NULL UNIQUE
) INHERITS (base_table);

-------- TABLE: contract_types --------
CREATE TABLE contract_types (
    id SERIAL PRIMARY KEY,
    name VARCHAR (100) NOT NULL UNIQUE,
    codename VARCHAR (100) NOT NULL UNIQUE
) INHERITS (base_table);

-------- TABLE: occupations --------
CREATE TABLE occupations (
    id SERIAL PRIMARY KEY,
    name VARCHAR (100) NOT NULL UNIQUE,
    codename VARCHAR (100) NOT NULL UNIQUE
) INHERITS (base_table);

-------- TABLE: certificate_types --------
CREATE TABLE certificate_types (
    id SERIAL PRIMARY KEY,
    name VARCHAR (100) NOT NULL UNIQUE,
    codename VARCHAR (100) NOT NULL UNIQUE
) INHERITS (base_table);

-------- TABLE: users --------
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    passwd VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE
) INHERITS (base_table);

-------- TABLE: status_types --------
CREATE TABLE status_types (
    id SERIAL PRIMARY KEY,
    name VARCHAR (100) NOT NULL UNIQUE,
    codename VARCHAR (100) NOT NULL UNIQUE
) INHERITS (base_table);

-------- TABLE: status --------
CREATE TABLE status (
  id SERIAL PRIMARY KEY,
  name VARCHAR (100) NOT NULL UNIQUE,
  codename VARCHAR (100) NOT NULL UNIQUE,
  status_type_id INT NOT NULL,
  
  FOREIGN KEY (status_type_id) REFERENCES status_types (id) ON DELETE RESTRICT ON UPDATE CASCADE
) INHERITS (base_table);

-------- TABLE: priorities --------
CREATE TABLE priorities (
    id SERIAL PRIMARY KEY,
    name VARCHAR (100) NOT NULL UNIQUE,
    codename VARCHAR (100) NOT NULL UNIQUE
) INHERITS (base_table);

-------- TABLE: request_types --------
CREATE TABLE request_types (
    id SERIAL PRIMARY KEY,
    name VARCHAR (100) NOT NULL UNIQUE,
    codename VARCHAR (100) NOT NULL UNIQUE
) INHERITS (base_table);

-------- TABLE: supports --------
CREATE TABLE supports (
    id SERIAL PRIMARY KEY,
    documents BYTEA,
    reason TEXT NOT NULL,
    observation TEXT
) INHERITS (base_table);

-------- TABLE: user_role --------
CREATE TABLE user_role (
user_id INT NOT NULL,
role_id INT NOT NULL,

FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE RESTRICT,
FOREIGN KEY (role_id) REFERENCES role(id) ON UPDATE CASCADE ON DELETE RESTRICT
) INHERITS (base_table);

-------- TABLE: departments --------
CREATE TABLE departments (
  id SERIAL PRIMARY KEY,
  name VARCHAR (100) NOT NULL UNIQUE,
  codename VARCHAR (100) NOT NULL UNIQUE,
  leader_id INT 
) INHERITS (base_table);

-------- TABLE: contracts --------
CREATE TABLE contracts (
  id SERIAL PRIMARY KEY,
  start_date DATE NOT NULL,
  end_date DATE,
  retire_date DATE,
  status_id INT NOT NULL,
  contract_type_id INT NOT NULL,
  department_id INT NOT NULL,
  occupation_id INT NOT NULL,
  responsibilities TEXT NOT NULL,
  salary NUMERIC (12, 2) NOT NULL,
  
  FOREIGN KEY (department_id) REFERENCES departments (id) ON DELETE RESTRICT ON UPDATE CASCADE,
  FOREIGN KEY (occupation_id) REFERENCES occupations (id) ON DELETE RESTRICT ON UPDATE CASCADE,
  FOREIGN KEY (status_id) REFERENCES status (id) ON DELETE RESTRICT ON UPDATE CASCADE,
  FOREIGN KEY (contract_type_id) REFERENCES contract_types (id) ON DELETE RESTRICT ON UPDATE CASCADE
) INHERITS(base_table);

-------- TABLE: employees --------
CREATE TABLE employees (
  id SERIAL PRIMARY KEY,
  name VARCHAR (100) NOT NULL,
  lastname VARCHAR (100) NOT NULL,
  birthday DATE NOT NULL,
  identification VARCHAR (50) NOT NULL UNIQUE,
  gender_id INT NOT NULL,
  user_id INT NOT NULL,
  contract_id INT,
  status_id INT,
  
  FOREIGN KEY (gender_id) REFERENCES genders (id) ON DELETE RESTRICT ON UPDATE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (status_id) REFERENCES status (id) ON DELETE SET NULL ON UPDATE CASCADE,
  FOREIGN KEY (contract_id) REFERENCES contracts (id) ON DELETE SET NULL ON UPDATE CASCADE
) INHERITS(base_table);

------ clave foránea de departaments ----------
ALTER TABLE departments
  ADD CONSTRAINT fk_department_employee FOREIGN KEY (leader_id) REFERENCES employees (id) ON DELETE SET NULL ON UPDATE CASCADE;
  
-------- TABLE: requests --------
CREATE TABLE requests (
  id SERIAL PRIMARY KEY,
  employee_id INT NOT NULL,
  request_type_id INT NOT NULL,
  support_id INT NOT NULL,
  status_id INT NOT NULL,
  priority_id INT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE,
  
  FOREIGN KEY (employee_id) REFERENCES employees (id) ON DELETE RESTRICT ON UPDATE CASCADE,
  FOREIGN KEY (request_type_id) REFERENCES request_types (id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (status_id) REFERENCES status (id) ON DELETE SET NULL ON UPDATE CASCADE,
  FOREIGN KEY (support_id) REFERENCES supports (id) ON DELETE SET NULL ON UPDATE CASCADE,
  FOREIGN KEY (priority_id) REFERENCES priorities (id) ON DELETE SET NULL ON UPDATE CASCADE
) INHERITS(base_table);
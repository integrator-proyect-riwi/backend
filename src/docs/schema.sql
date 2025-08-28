-- 🔹 Borrar tablas en orden seguro
DROP TABLE IF EXISTS vacations CASCADE;
DROP TABLE IF EXISTS certificates_requests CASCADE;
DROP TABLE IF EXISTS custom_requests CASCADE;
DROP TABLE IF EXISTS priorities CASCADE;
DROP TABLE IF EXISTS supports CASCADE;
DROP TABLE IF EXISTS employees CASCADE;
DROP TABLE IF EXISTS contracts CASCADE;
DROP TABLE IF EXISTS departments CASCADE;
DROP TABLE IF EXISTS types_contracts CASCADE;
DROP TABLE IF EXISTS admins CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS users_role CASCADE;
DROP TABLE IF EXISTS types_certificates CASCADE;
DROP TABLE IF EXISTS types_requests CASCADE;
DROP TABLE IF EXISTS occupations CASCADE;
DROP TABLE IF EXISTS status CASCADE;
DROP TABLE IF EXISTS types_status CASCADE;
DROP TABLE IF EXISTS genders CASCADE;


-------- TABLE: users_role --------
CREATE TABLE users_role (
  id SERIAL PRIMARY KEY,
  name VARCHAR (100) NOT NULL UNIQUE,
  codename VARCHAR (100) NOT NULL UNIQUE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-------- TABLE: genders --------
CREATE TABLE genders (
  id SERIAL PRIMARY KEY,
  name VARCHAR (100) NOT NULL UNIQUE,
  codename VARCHAR (100) NOT NULL UNIQUE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-------- TABLE: types_status --------
CREATE TABLE types_status (
  id SERIAL PRIMARY KEY,
  name VARCHAR (100) NOT NULL UNIQUE,
  codename VARCHAR (100) NOT NULL UNIQUE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-------- TABLE: status --------
CREATE TABLE status (
  id SERIAL PRIMARY KEY,
  name VARCHAR (100) NOT NULL UNIQUE,
  codename VARCHAR (100) NOT NULL UNIQUE,
  id_types_status INT NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_status_types FOREIGN KEY (id_types_status) REFERENCES types_status (id) ON DELETE RESTRICT ON UPDATE CASCADE
);

-------- TABLE: occupations --------
CREATE TABLE occupations (
  id SERIAL PRIMARY KEY,
  name VARCHAR (100) NOT NULL UNIQUE,
  codename VARCHAR (100) NOT NULL UNIQUE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-------- TABLE: types_requests --------
CREATE TABLE types_requests (
  id SERIAL PRIMARY KEY,
  name VARCHAR (100) NOT NULL UNIQUE,
  codename VARCHAR (100) NOT NULL UNIQUE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-------- TABLE: types_certificates --------
CREATE TABLE types_certificates (
  id SERIAL PRIMARY KEY,
  name VARCHAR (100) NOT NULL UNIQUE,
  codename VARCHAR (100) NOT NULL UNIQUE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-------- TABLE: users --------
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR (100) NOT NULL UNIQUE,
  passwd VARCHAR (255) NOT NULL,
  email VARCHAR (100) NOT NULL UNIQUE,
  id_user_role INT NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_users_role FOREIGN KEY (id_user_role) REFERENCES users_role (id) ON DELETE RESTRICT ON UPDATE CASCADE
);

-------- TABLE: admins --------
CREATE TABLE admins (
  id SERIAL PRIMARY KEY,
  name VARCHAR (100) NOT NULL,
  lastname VARCHAR (100) NOT NULL,
  id_user INT NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_admins_user FOREIGN KEY (id_user) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE
);

-------- TABLE: types_contracts --------
CREATE TABLE types_contracts (
  id SERIAL PRIMARY KEY,
  name VARCHAR (100) NOT NULL,
  codename VARCHAR (100) NOT NULL UNIQUE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-------- TABLE: departments --------
CREATE TABLE departments (
  id SERIAL PRIMARY KEY,
  name VARCHAR (100) NOT NULL UNIQUE,
  codename VARCHAR (100) NOT NULL UNIQUE,
  is_active BOOLEAN DEFAULT TRUE,
  id_employee INT, -- 🔹 AHORA NULLABLE para que funcione ON DELETE SET NULL
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-------- TABLE: contracts --------
CREATE TABLE contracts (
  id SERIAL PRIMARY KEY,
  start_date DATE NOT NULL,
  end_date DATE,
  retire_date DATE,
  id_status INT NOT NULL,
  id_type_contract INT NOT NULL,
  id_department INT NOT NULL,
  id_occupation INT NOT NULL,
  responsibilities TEXT NOT NULL,
  salary NUMERIC (12, 2) NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_contracts_department FOREIGN KEY (id_department) REFERENCES departments (id) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT fk_contracts_occupation FOREIGN KEY (id_occupation) REFERENCES occupations (id) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT fk_contracts_status FOREIGN KEY (id_status) REFERENCES status (id) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT fk_contracts_type_contract FOREIGN KEY (id_type_contract) REFERENCES types_contracts (id) ON DELETE RESTRICT ON UPDATE CASCADE
);

-------- TABLE: employees --------
CREATE TABLE employees (
  id SERIAL PRIMARY KEY,
  name VARCHAR (100) NOT NULL,
  lastname VARCHAR (100) NOT NULL,
  birthday DATE NOT NULL,
  identification VARCHAR (50) NOT NULL UNIQUE,
  id_gender INT NOT NULL,
  id_user INT NOT NULL,
  id_contract INT,
  id_status INT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_employees_gender FOREIGN KEY (id_gender) REFERENCES genders (id) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT fk_employees_user FOREIGN KEY (id_user) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_employees_status FOREIGN KEY (id_status) REFERENCES status (id) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT fk_employees_contract FOREIGN KEY (id_contract) REFERENCES contracts (id) ON DELETE SET NULL ON UPDATE CASCADE
);

------ clave foránea de departaments (agregada después para evitar dependencia circular)
ALTER TABLE departments
  ADD CONSTRAINT fk_department_employee FOREIGN KEY (id_employee) REFERENCES employees (id) ON DELETE SET NULL ON UPDATE CASCADE;

-------- TABLE: supports --------
CREATE TABLE supports (
  id SERIAL PRIMARY KEY,
  documents BYTEA NOT NULL,
  description TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-------- TABLE: priorities --------
CREATE TABLE priorities (
  id SERIAL PRIMARY KEY,
  name VARCHAR (100) NOT NULL,
  codename VARCHAR (100) NOT NULL UNIQUE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-------- TABLE: custom_requests --------
CREATE TABLE custom_requests (
  id SERIAL PRIMARY KEY,
  id_employee INT NOT NULL,
  id_type_request INT NOT NULL,
  id_support INT NOT NULL,
  id_status INT NOT NULL,
  id_priority INT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_custom_requests_employee FOREIGN KEY (id_employee) REFERENCES employees (id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_custom_requests_type FOREIGN KEY (id_type_request) REFERENCES types_requests (id) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT fk_custom_requests_support FOREIGN KEY (id_support) REFERENCES supports (id) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT fk_custom_requests_status FOREIGN KEY (id_status) REFERENCES status (id) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT fk_custom_requests_priority FOREIGN KEY (id_priority) REFERENCES priorities (id) ON DELETE RESTRICT ON UPDATE CASCADE
);

-------- TABLE: certificates_requests --------
CREATE TABLE certificates_requests (
  id SERIAL PRIMARY KEY,
  id_employee INT NOT NULL,
  id_type_certificate INT NOT NULL,
  id_status INT NOT NULL,
  id_priority INT NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_certificates_requests_employee FOREIGN KEY (id_employee) REFERENCES employees (id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_certificates_requests_type FOREIGN KEY (id_type_certificate) REFERENCES types_certificates (id) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT fk_certificates_requests_status FOREIGN KEY (id_status) REFERENCES status (id) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT fk_certificates_requests_priority FOREIGN KEY (id_priority) REFERENCES priorities (id) ON DELETE RESTRICT ON UPDATE CASCADE
);

-------- TABLE: vacations --------
CREATE TABLE vacations (
  id SERIAL PRIMARY KEY,
  id_employee INT NOT NULL,
  description TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  id_status INT NOT NULL,
  id_priority INT NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_vacations_employee FOREIGN KEY (id_employee) REFERENCES employees (id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_vacations_status FOREIGN KEY (id_status) REFERENCES status (id) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT fk_vacations_priority FOREIGN KEY (id_priority) REFERENCES priorities (id) ON DELETE RESTRICT ON UPDATE CASCADE
);

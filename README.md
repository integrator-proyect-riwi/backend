# TramiGo - Backend Documentation

## Project Overview
TramiGo is designed to develop a centralized application that automates, organizes, and provides traceability to personnel requests and administrative processes. The system facilitates interaction between employees, leaders, and the Human Resources department.

---

## Technologies Used

### Dependencies
- **bcrypt** (^6.0.0): Library for hashing and verifying passwords securely. Used for user authentication.  
- **cors** (^2.8.5): Middleware to enable Cross-Origin Resource Sharing, allowing the frontend to communicate with the backend safely.  
- **dotenv** (^17.2.1): Loads environment variables from a `.env` file into `process.env`. Keeps sensitive information like database credentials secure.  
- **express** (^5.1.0): Web framework for Node.js, used to create RESTful APIs and handle HTTP requests.  
- **jsonwebtoken** (^9.0.2): Implements JWT (JSON Web Tokens) for user authentication and secure route protection.  
- **morgan** (^1.10.1): HTTP request logger middleware, useful for debugging and monitoring API requests.  
- **multer** (^2.0.2): Middleware for handling multipart/form-data, used to upload files such as documents or images.  
- **pg** (^8.16.3): PostgreSQL client for Node.js to connect and query the database.  
- **pg-hstore** (^2.3.4): Helper library to serialize and deserialize JSON data into PostgreSQL’s hstore format.  
- **sequelize** (^6.37.7): ORM (Object-Relational Mapping) for Node.js, used to manage database models, relationships, and queries in a structured way.  
- **swagger-jsdoc** (^6.2.8): Generates Swagger/OpenAPI documentation from JSDoc comments in your code.  
- **swagger-ui-express** (^5.0.1): Serves Swagger UI in Express, allowing interactive API documentation.  
- **yamljs** (^0.3.0): Loads YAML files, useful for managing Swagger/OpenAPI definitions.

---

### Dev Dependencies
- **nodemon** (^3.1.10): Automatically restarts the server during development when file changes are detected, improving productivity.  

---

## API Documentation
The complete API documentation is available in [Swagger](https://backend-0syv.onrender.com/api-docs/)

---
# Backend Architecture

The backend of TramiGo follows a **Model-View-Controller (MVC) architecture** adapted for a RESTful API. 
The main goal is to separate concerns, making the code modular, maintainable, and scalable.

---

## Folder Structure (Draft)

```bash
/BACKEND
├─ /src       # Business logic for handling requests
│   ├─ /config            # Configuration files (database, environment variables)
│   │   ├─ db.js
│   │   └─ swagger.js
│   │
│   ├─ /controllers       # Business logic for handling requests
│   │   ├─ auth.controller.js
│   │   ├─ department.controller.js
│   │   ├─ employees.controller.js
│   │   ├─ index.js
│   │   ├─ requests.controller.js
│   │   └─ users.controller.js
│   │
│   ├─ /docs           
│   │   ├─ insert_data.sql
│   │   ├─ schema.sql
│   │   └─ swagger.yaml
│   │
│   ├─ /middlewares       # Middleware functions (authentication, validation, logging)
│   │   ├─ auth.middleware.js
│   │   └─ index.js
│   │
│   ├─ /models            # Sequelize models and database definitions
│   │   ├─ associations.js
│   │   ├─ baseModel.js
│   │   ├─ certificateRequest.js
│   │   ├─ certificateType.js
│   │   ├─ contract.js
│   │   ├─ contractType.js
│   │   ├─ department.js
│   │   ├─ employee.js
│   │   ├─ gender.js
│   │   ├─ index.js
│   │   ├─ occupation.js
│   │   ├─ priority.js
│   │   ├─ request.js
│   │   ├─ requestsType.js
│   │   ├─ role.js
│   │   ├─ status.js
│   │   ├─ statusType.js
│   │   ├─ support.js
│   │   ├─ user.js
│   │   └─ userRole.js
│   │
│   ├─ /routes            # API endpoints definition, mapped to controllers
│   │   ├─ auth.routes.js
│   │   ├─ department.route.js
│   │   ├─ employees.route.js
│   │   ├─ index.js
│   │   ├─ requests.route.js
│   │   └─ users.route.js
│   │
│   ├─ app.js          # Express app configuration (middlewares, routes setup)
│   └─ server.js          # Server entry point, starts the Express server
├─ .env.template         # Environment variables    
├─ .gitignore
├─ package-lock.json
├─ package.json       # Dependencies and scripts
└─ README.md            
```
---
## Detailed Architecture Diagram 
```bash
                    +----------------+
                    |    Frontend    |
                    +----------------+
                            |
                            v
                    +----------------+
                    |     Routes     |  <-- Maps HTTP requests to controllers
                    +----------------+
                            |
                            v
                    +----------------+
                    |   Controllers  |  <-- Business logic
                    +----------------+
                            |
            +-------------+-------------+
            |                           |
            v                           v
        +--------------+           +----------------+
        | Middlewares  |           |    Models      |  <-- Sequelize ORM, DB interactions
        | (auth,       |           | (User, Request,|
        | validation)  |           |  Role, etc.)   |
        +--------------+           +----------------+
                            |
                            v
                    +----------------+
                    |   Database     |  <-- PostgreSQL
                    +----------------+
```
---

## Controllers y Middlewares
---
### AuthController

**Purpose:**  
Handles user authentication, including registration, login, and logout operations. Ensures secure access to the application.

#### Main Methods

1. **register(req, res)**  
   - **Description:** Creates a new user.  
   - **Key Actions:**  
     - Validates user input.  
     - Hashes the password using `bcrypt` before storing it in the database.  
     - Returns success or error response.

2. **login(req, res)**  
   - **Description:** Authenticates a user and provides access tokens.  
   - **Key Actions:**  
     - Validates user credentials.  
     - Generates a JWT token for authenticated sessions.  
     - Returns token and user info or error response.

3. **logout(req, res)**  
   - **Description:** Logs out a user by invalidating the session.  
   - **Key Actions:**  
     - Validates the JWT token.  
     - Performs any necessary cleanup (if applicable).  
     - Returns success response.

#### Notes
- All methods ensure proper error handling for invalid inputs or authentication failures.  
- JWT is used for secure session management.  
- Passwords are securely hashed with `bcrypt` to prevent storage of plain-text passwords.
---

### UserController

**Purpose:**  
Manages all user-related operations, including creating users, retrieving user data, and updating user information. Ensures that only active users are considered.

#### Main Methods

1. **createUser(req, res)**  
   - **Description:** Creates a new user in the system.  
   - **Key Actions:**  
     - Receives `username`, `email`, and `password` from the request.  
     - Hashes the password using `bcrypt` before saving.  
     - Returns success or error response.

2. **getUsers(req, res)**  
   - **Description:** Retrieves all active users.  
   - **Key Actions:**  
     - Filters users by `is_active = true`.  
     - Returns `username`, `email`, and `role` for each user.

3. **getUserById(req, res)**  
   - **Description:** Retrieves a specific active user by ID.  
   - **Key Actions:**  
     - Checks if the user exists and is active.  
     - Returns `username`, `email`, and `role`.

4. **updateUser(req, res)**  
   - **Description:** Updates information of an active user by ID.  
   - **Key Actions:**  
     - Validates the user exists and is active.  
     - Updates allowed fields (e.g., username, email).  
     - Returns updated user info or error response.

#### Notes
- Only users with `is_active = true` are returned or updated.  
- Passwords are hashed before storing.  
- User roles are included when retrieving data to maintain access context.

---

### EmployeesController

**Purpose:**  
Manages all employee-related operations, including creating employees, retrieving their information, and updating employee data. Ensures that only active employees are processed.

#### Main Methods

1. **createEmployee(req, res)**  
   - **Description:** Creates a new employee in the system.  
   - **Key Actions:**  
     - Receives employee details (name, email, department, etc.) from the request.  
     - Validates input and stores the employee in the database.  
     - Returns success or error response.

2. **getEmployee(req, res)**  
   - **Description:** Retrieves a specific employee by ID.  
   - **Key Actions:**  
     - Checks if the employee exists and is active.  
     - Returns employee information.

3. **employeeInformation(req, res)**  
   - **Description:** Retrieves detailed information of an employee, including all related data (department, role, requests, contracts, etc.).  
   - **Key Actions:**  
     - Aggregates employee data from multiple related models.  
     - Returns a comprehensive employee profile.

4. **updateEmployee(req, res)**  
   - **Description:** Updates information of an active employee by ID.  
   - **Key Actions:**  
     - Validates the employee exists and is active.  
     - Updates allowed fields and returns the updated employee data.

#### Notes
- Only employees with `is_active = true` are returned or updated.  
- Employee information includes related entities like department, contracts, and requests.  
- Input validation is applied to ensure data integrity.

---
### DepartmentController

**Purpose:**  
Manages department-related operations, including retrieving department information along with its leader.

#### Main Methods

1. **getDepartmentLeader(req, res)**  
   - **Description:** Retrieves the name of the department along with the name of its leader.  
   - **Key Actions:**  
     - Queries the department and its associated leader from the database.  
     - Returns department name and leader information.

#### Notes
- Only active departments and leaders are considered.  
- Useful for organizational overview and employee-department mapping.

---

### RequestsController

**Purpose:**  
Manages employee requests, including creation, retrieval, updates, and soft deletion. Provides detailed filtering and analytics by type, status, and recency. Handles user permissions (admin vs regular user).

#### Main Methods

1. **createRequest(req, res)**  
   - **Description:** Creates a new request for an employee.  
   - **Key Actions:**  
     - Receives request data from the user.  
     - Validates required fields.  
     - Stores the request in the database.  
     - Returns success or error response.

2. **getRequests(req, res)**  
   - **Description:** Retrieves all requests visible to the current user.  
   - **Key Actions:**  
     - Checks if the user is an admin or regular user.  
     - Admins see all requests; users see only their own.  
     - Returns request details including status, type, and employee info.

3. **getRequestById(req, res)**  
   - **Description:** Retrieves a specific request by ID.  
   - **Key Actions:**  
     - Validates the request exists and is active.  
     - Returns full request information.

4. **updateRequestStatus(req, res)**  
   - **Description:** Updates the status of a request (e.g., approved or denied).  
   - **Key Actions:**  
     - Validates the request exists and is active.  
     - Updates the status field.  
     - Returns updated request data.

5. **deleteRequest(req, res)**  
   - **Description:** Performs a soft delete of a request.  
   - **Key Actions:**  
     - Sets `is_active = false` instead of removing the record.  
     - Returns success response.

6. **getRequestsByType(req, res)**  
   - **Description:** Retrieves the total number of requests for each type.  
   - **Key Actions:**  
     - Aggregates requests grouped by type.  
     - Returns counts per type.

7. **getRequestsByStatus(req, res)**  
   - **Description:** Retrieves requests filtered by status (approved, denied, pending).  
   - **Key Actions:**  
     - Filters requests by status.  
     - Returns filtered list.

8. **getLatestRequests(req, res)**  
   - **Description:** Retrieves the most recent requests.  
   - **Key Actions:**  
     - Returns the latest four requests.  

9. **getTotalRequests(req, res)**  
   - **Description:** Returns the total number of requests in the system.  

10. **getRequestTypes(req, res)**  
    - **Description:** Retrieves the types of requests available in the system.  

#### Notes
- Only active requests (`is_active = true`) are considered.  
- Methods include role-based filtering: admins see all requests, users see their own.  
- Soft delete ensures that deleted requests are not removed permanently.  
- Aggregation methods provide analytics on requests by type and status.

---

### Middlewares

**Purpose:**  
Middlewares are functions that execute before controllers to handle common tasks such as authentication, validation, and logging. They ensure consistent behavior and security across all routes.

#### Main Middlewares

1. **authMiddleware (auth.middleware.js)**  
   - **Description:** Handles user authentication for protected routes.  
   - **Key Actions:**  
     - Validates the JWT token sent in the request header.  
     - Ensures the token is valid and not expired.  
     - Attaches the authenticated user information to `req.user` for use in controllers.  
     - Returns an error response if the token is invalid or missing.  
   - **Applied to:** All routes that require authentication, such as creating requests, updating users, etc.

2. **index.js**  
   - **Description:** Serves as a central exporter for all middleware functions.  
   - **Key Actions:**  
     - Imports individual middlewares and exports them as a single object.  
     - Makes it easier to include middlewares in `app.js` or route files.
---

## Collaborators

- **Abraham Villa** – Fullstack Developer – [GitHub](https://github.com/ajvilla99) | [Linkedin](https://linkedin.com)
- **Carlos Gutierrez** – Fullstack Developer – [GitHub](https://github.com/carlosGG9)
- **Yoelmis Perdomo** – Fullstack Developer – [GitHub](https://github.com/YePerdom)
- **Cesar Hernandez** – Fullstack Developer – [GitHub](https://github.com/cahg99)
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
The complete API documentation is available in [Swagger](#)

## 🤝 Collaborators

- **Abraham Villa** – Fullstack Developer – [GitHub](https://github.com/ajvilla99) | [Linkedin](https://linkedin.com)
- **Carlos Gutierrez** – Fullstack Developer – [GitHub](https://github.com/carlosGG9)
- **Yoelmis Perdomo** – Fullstack Developer – [GitHub](https://github.com/YePerdom)
- **Cesar Hernandez** – Fullstack Developer – [GitHub](https://github.com/cahg99)

import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

// Import Documentation
import { swaggerUi, swaggerDocument } from './config/swagger.js';

// import routes from './routes/index.js';
import { auth, employees, requests, users, department } from './routes/index.js';
import { verifyToken } from './middlewares/auth.middleware.js';

// 
const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

// Documentation Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.get('/api/v1/', async(req,res) => {
    res.send('Connected')
});

// auth
app.use('/api/v1/auth', auth);

// users
app.use('/api/v1/users', verifyToken, users);

// employees
app.use('/api/v1/employees', verifyToken, employees);

// requests
app.use('/api/v1/requests', verifyToken, requests);

// leaders and departments
app.use('/api/v1/leaders', verifyToken, department);

export default app;
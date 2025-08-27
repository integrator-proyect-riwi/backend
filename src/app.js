import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

// Import Documentation
import { swaggerUi, swaggerDocument } from './config/swagger.js';

// import routes from './routes/index.js';
import { auth, employees, usersRoutes } from './routes/index.js';

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
    res.send('Conectada')
});

//auth
app.use('/api/v1/auth', auth);

// users
app.use('/api/v1/users', usersRoutes)

// employees
app.use('/api/v1/employees', employees);

export default app;
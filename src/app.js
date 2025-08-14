import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

// import routes from './routes/index.js';
import { swaggerUi, swaggerDocument } from './config/swagger.js';
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

export default app;
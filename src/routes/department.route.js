import { Router } from 'express';
import { getDepartmentsWithLeaders } from '../controllers/department.controller.js';

const router = Router();

router.get('/', getDepartmentsWithLeaders);

export default router;

import { Router } from 'express';
import { createRequest, lastRequests, requestsByStatus, totalRequests } from '../controllers/reqests.controller.js';

const router = Router();

router.get('/total-requests', totalRequests);
router.get('/requests-by-status', requestsByStatus);
router.get('/last-requests', lastRequests);
router.post('/create-request', createRequest);

export default router;
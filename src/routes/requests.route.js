import { Router } from 'express';
import { createRequest, getRequests, lastRequests, requestsByStatus, totalRequests, requestsByType } from '../controllers/reqests.controller.js';

const router = Router();

router.get('/', getRequests);
router.get('/total-requests', totalRequests);
router.get('/requests-by-status', requestsByStatus);
router.get('/last-requests', lastRequests);
router.get('/type', requestsByType)
router.post('/create-request', createRequest);

export default router;
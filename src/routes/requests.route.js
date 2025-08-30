import { Router } from 'express';
import { lastRequests, requestsByStatus, totalRequests, requestsByType } from '../controllers/reqests.controller.js';

const router = Router();

router.get('/total-requests', totalRequests);
router.get('/requests-by-status', requestsByStatus);
router.get('/last-requests', lastRequests)
router.get('/type', requestsByType)

export default router;
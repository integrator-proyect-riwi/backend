import { Router } from 'express';
import { createRequest, getRequests, lastRequests, requestsByStatus, totalRequests, requestsByType, getTypeRequest, updateStatusRequest } from '../controllers/reqests.controller.js';

const router = Router();

router.get('/', getRequests);
router.get('/total-requests', totalRequests);
router.get('/requests-by-status', requestsByStatus);
router.get('/last-requests', lastRequests);
router.get('/type', requestsByType)
router.post('/create-request', createRequest);
router.get('/types', getTypeRequest);
router.patch('/:code/status', updateStatusRequest);

export default router;
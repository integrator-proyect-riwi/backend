import { Router } from 'express';
import { createRequest, getRequests, lastRequests, requestsByStatus, totalRequests, requestsByType, getTypeRequest, updateStatusRequest, getAllRequests, getRequestById} from '../controllers/requests.controller.js';

const router = Router();

router.get('/', getRequests);
router.get('/total-requests', totalRequests);
router.get('/requests-by-status', requestsByStatus);
router.get('/last-requests', lastRequests);
router.get('/type', requestsByType)
router.post('/create-request', createRequest);
router.get('/types', getTypeRequest);
router.patch('/:code/status', updateStatusRequest);
router.get('/employees-info', getAllRequests);
router.get('/employees/:id', getRequestById);

export default router;
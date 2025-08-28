import { Router } from "express";
// import { getBillings, getBillingId, createBilling, editBilling, deleteBilling } from "../controllers/billing.controller.js";

const router = Router();

router.get('/', (req, res) => {
    res.send('Todos los trabajadores')
});
router.get('/:id/history', () => {
    // 👉 Devuelve:
    // Datos básicos del colaborador.
    // Timeline de cambios (ascensos, traslados).
    // Consolidado de solicitudes (vacaciones, permisos, certificados).
});

router.get('/employees/:id/history/vacations' , () => {})
router.get('/employees/:id/history/permissions' , () => {})
router.get('/employees/:id/history/certificates' , () => {})

export default router;
import { Router } from "express";
// import { getBillings, getBillingId, createBilling, editBilling, deleteBilling } from "../controllers/billing.controller.js";

const router = Router();

router.get('/' , (req, res) => {
    res.send('Ey vale mia esta llegando todo!!')
})
router.get('/users/:id' , () => {})

export default router;
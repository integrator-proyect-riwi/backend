// routes/employees.js
import { Router } from "express";
import { getEmployeeinformation, createEmployee, getEmployee, updateEmployee} from "../controllers/employees.controller.js";
import applyAssociations from '../models/associations.js';  // o donde esté tu archivo
applyAssociations()

const router = Router();

// Defines the route to obtain information about all employees
router.get("/info", getEmployeeinformation);

// Defines the route to get all employees
router.get("/", getEmployee);

// Defines the path to create a new employee
router.post("/", createEmployee);

// Defines the path to update an employee by ID
router.put("/:id", updateEmployee);

export default router;

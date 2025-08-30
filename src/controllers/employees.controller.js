import Employee from "../models/employee.js";
import Request from "../models/request.js";
import RequestType from "../models/requestsType.js";
import Status from "../models/status.js";
import User from "../models/user.js";
import Department from "../models/department.js";
import Occupation from "../models/occupation.js";
import Contract from "../models/contract.js";

export const getEmployeeinformation = async (req, res) => {
  try {
    const employees = await Employee.findAll({
      attributes: ["id", "name", "lastname", "identification"],
      include: [
        { model: Status, as: "status", attributes: ["name", "codename"] },
        {
          model: Contract,
          as: "contract",
          include: [
            { model: Department, as: "department", attributes: ["name", "codename"] },
            { model: Occupation, as: "occupation", attributes: ["name", "codename"] },
            { model: Status, as: "status", attributes: ["name", "codename"] }
          ]
        },
        { model: User, as: "user", attributes: ["email", "username"] },
        {
          model: Request,
          as: "requests",
          include: [
            { model: Status, as: "status", attributes: ["codename"] },
            { model: RequestType, as: "request_type", attributes: ["codename"] }
          ]
        }
      ]
    });

    const result = employees.map(emp => {
      const solicitudesPendientes = emp.requests.filter(r => r.status.codename === "pending").length;

      const diasVacacionesPendientes = emp.requests
        .filter(r => r.request_type.codename === "vacation_request" && r.status.codename === "pending")
        .reduce((sum, r) => {
          const inicio = new Date(r.start_date);
          const fin = new Date(r.end_date);
          const diff = (fin - inicio) / (1000 * 60 * 60 * 24) + 1;
          return sum + diff;
        }, 0);

      return {
        id: emp.id,
        employee: `${emp.name} ${emp.lastname}`,
        email: emp.user?.email ?? null,
        status: emp.status?.name ?? null,
        department: emp.contract?.department?.name ?? null,
        occupation: emp.contract?.occupation?.name ?? null,
        solicitudes_pendientes: solicitudesPendientes,
        dias_vacaciones_pendientes: diasVacacionesPendientes
      };
    });

    res.json(result);
  } catch (error) {
    console.error("Error en getEmployeeVacationSummary:", error);
    res.status(500).json({ error: "Error obteniendo resumen de empleados" });
  }
};

// create employee
export async function createEmployee(req, res) {
  try {
    const employee = await Employee.create(req.body);
    res.status(201).json(employee);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// list all employees
export async function getEmployee(req, res) {
  try {
    const employee = await Employee.findAll();
    res.json(employee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// update employee by id
export async function updateEmployee(req, res) {
  try {
    const { id } = req.params;
    const employee = await Employee.findByPk(id);

    if (!employee) {
      return res.status(404).json({ error: "Empleado no encontrado" });
    }

    await employee.update(req.body);
    res.json(employee);
  } catch (error) {
    console.error("Error al actualizar empleado:", error);
    res.status(400).json({ error: error.message });
  }
}

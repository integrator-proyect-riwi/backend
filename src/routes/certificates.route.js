// import { Router } from "express";
// import Certificates from "../models/certificates.js";
// import Employees from "../models/employees.js";
// import TypesCertificates from "../models/typesCertificates.js";
// import Status from "../models/status.js";
// import Priorities from "../models/priorities.js";
// import { createCertificates} from "../controllers/certificates.controller.js";
// import "../models/associations.js"; 

// const router = Router();

// // 📌 Listar tipos de certificados activos
// router.get("/types", async (req, res) => {
//   try {
//     const types = await TypesCertificates.findAll({ where: { is_active: true } });
//     res.json(types);
//   } catch (err) {
//     res.status(500).json({ error: "Error fetching certificate types" });
//   }
// });

// // 📌 Listar todas las solicitudes de certificados
// router.get("/", async (req, res) => {
//   try {
//     const requests = await Certificates.findAll({
//     include: [
//         { model: Employees, as: "employee", attributes: ["name", "lastname"] },
//         { model: TypesCertificates, as: "certificateType", attributes: ["name"] },
//         { model: Status, as: "status", attributes: ["name"] },
//         { model: Priorities, as: "priority", attributes: ["name"] },
//     ],
//     order: [["created_at", "DESC"]],
//     });

//     // Si quieres que employee aparezca como string concatenado:
//     const formatted = requests.map(r => ({
//         id: r.id,
//         employee: `${r.employee?.name || ""} ${r.employee?.lastname || ""}`,
//         certificate_type: r.certificateType?.name,
//         status: r.status?.name,
//         priorities: r.priority?.name,
//         active: r.is_active,
//         created_at: r.created_at,
//         updated_at: r.updated_at,
//         }));


//     res.json(formatted);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // 📌 Listar solicitudes por empleado
// router.get("/:employeeId", async (req, res) => {
//   try {
//     const { employeeId } = req.params;

//     const requests = await Certificates.findAll({
//       where: { id_employee: employeeId },
//       include: [
//         { model: TypesCertificates, as: "certificateType", attributes: ["name"] },
//         { model: Status, as: "status", attributes: ["name"] },
//         { model: Employees, as: "employee", attributes: ["name", "lastname"] }, // 👈 opcional si quieres ver empleado
//         { model: Priorities, as: "priority", attributes: ["name"] }, // 👈 si también tienes prioridad
//       ],
//       order: [["created_at", "DESC"]],
//     });

//     if (!requests.length) {
//       return res.status(404).json({ message: "No requests found" });
//     }

//     // console.log(JSON.stringify(requests, null, 2))
//     const formatted = requests.map(r => ({
//       id: r.id,
//       certificate: r.certificateType?.name, // 👈 usa ? para evitar crash si es null
//       status: r.status?.name,
//       priority: r.priority?.name,
//       employee: r.employee ? `${r.employee.name} ${r.employee.lastname}` : null,
//       created_at: r.created_at,
//       updated_at: r.updated_at,
//     }));

//     res.json(formatted);
//   } catch (err) {
//     console.error("❌ ERROR en /certificates/:employeeId:", err); // 👈 log detallado
//     res.status(500).json({ error: "Error fetching requests", details: err.message });
//   }
// });

// // 📌 Crear nueva solicitud de certificado
// router.post("/", createCertificates);

// export default router;
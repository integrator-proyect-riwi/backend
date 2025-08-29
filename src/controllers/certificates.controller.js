// import Certificates from "../models/certificates.js";

// //crear certificado
// export async function createCertificates(req, res) {
//   try {
//     const certificates = await Certificates.create(req.body);
//     res.status(201).json(certificates);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// }

// // Listar certificados
// export async function getCertificates(req, res) {
//   try {
//     const certificates = await Certificates.findAll();
//     res.json(certificates);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// }
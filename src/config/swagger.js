import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import YAML from 'yaml';
import swaggerUi from 'swagger-ui-express';

// Obtener __dirname en ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Leer archivo YAML
const file = fs.readFileSync(path.join(__dirname, '../docs/swagger.yaml'), 'utf8');
const swaggerDocument = YAML.parse(file);

export { swaggerUi, swaggerDocument };
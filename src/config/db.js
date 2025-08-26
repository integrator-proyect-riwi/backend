import { Pool } from "pg";
import 'dotenv/config';

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME
});

async function testConnection() {
    let conexion = null
    try {
        conexion = await pool.connect();
        console.log("✅ conexion exitosa a la base de datos");
    } catch (error) {
        if (error) {
            console.error("❌ Error al conectar con la base de datos:", error.message);
        } else {
            console.error("❌ Error desconocido:", error);
        };
    } finally {
        if (conexion) conexion.release();
    };
};

testConnection();
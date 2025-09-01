import { Sequelize } from 'sequelize';
import 'dotenv/config';

const sequelize = new Sequelize(
  process.env.DB_NAME,     
  process.env.DB_USER,     
  process.env.DB_PASSWORD, 
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    port: process.env.DB_PORT,
    logging: false,
  }
);


async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexión exitosa a la base de datos con Sequelize');
  } catch (error) {
    console.error('❌ Error al conectar con la base de datos:', error.message);
  }
}

// testConnection();

export default sequelize;
import dotenv from 'dotenv';
import app from './app.js';

import { syncDB } from './models/index.js';

// Load environment variables
dotenv.config();


const startServer = async () => {
  try {
    await syncDB();
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Servidor escuchando en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Error al iniciar servidor:', error);
  };
};

startServer();
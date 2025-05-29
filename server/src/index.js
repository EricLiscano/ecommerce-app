// Backend principal: Express + Sequelize
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./models');
const routes = require('./routes');
const cookieParser = require('cookie-parser');

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
const allowedOrigins = (process.env.CLIENT_URL || 'http://localhost:8080').split(',');
app.use(cors({
  origin: function(origin, callback) {
    // Permitir requests sin origin (como Postman) o si está en la lista
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true
}));

// Rutas principales
app.use('/api', routes);

// Puerto
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  try {
    await db.sequelize.authenticate();
    console.log('Conexión a la base de datos exitosa.');
  } catch (err) {
    console.error('Error al conectar a la base de datos:', err);
  }
  console.log(`Servidor backend corriendo en puerto ${PORT}`);
});

// app.js

const express = require('express');
const connectDB = require('./config/db');
const ordenesRoutes = require('./routes/ordenes');

const app = express();

// Conectar a la base de datos
connectDB();

// Middleware para parsear JSON
app.use(express.json());

// Rutas
app.use('/ordenes', ordenesRoutes);

// Puerto de escucha
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

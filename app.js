require('dotenv').config();
const express = require('express');
const cors = require('cors'); // <-- Importa cors
const connectDB = require('./config/db');
const ordenesRoutes = require('./routes/ordenes');

const app = express();


connectDB();

// Habilitar CORS
app.use(cors());


app.use(express.json());

// Rutas
app.use('/api/ordenes', ordenesRoutes);

//const PORT = process.env.PORT || 3000;
//app.listen(PORT, () => {
//  console.log(`Servidor escuchando en el puerto ${PORT}`);
//});

module.exports = app;
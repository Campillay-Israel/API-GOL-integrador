const mongoose = require('mongoose');

const OrdenSchema = new mongoose.Schema({
  destino: {
    type: String,
    required: [true, 'El destino es obligatorio'],               
    minlength: [5, 'La dirección debe tener al menos 5 caracteres'] 
  },
  contenido: {
    type: String,
    required: [true, 'El contenido es obligatorio'],            
  },
  fecha_creacion: {
    type: Date,
    default: Date.now,
  },
  estado: {
    type: String,
    required: [true, 'El estado es obligatorio'],               
    enum: {
      values: ['Pendiente', 'En tránsito', 'Entregado'],        
      message: 'El estado debe ser Pendiente, En tránsito o Entregado'
    }
  },
});

module.exports = mongoose.model('Orden', OrdenSchema);
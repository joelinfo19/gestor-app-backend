const {model, Schema} = require('mongoose')

const Cursos = new Schema({
    codigo:{
        type: String,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    tipo: {
        type: String,
        required: true
    },
    categoria:{
        type: String,
        required: true
    },
    grupo: {
        type: String,
        required: true
    },
    creditos: {
        type: Number,
        required: true
    },
    horario: [
        {dia: String, horaInicio: String, horaFin: String}
    ]

    
});

module.exports = model('Cursos', Cursos)
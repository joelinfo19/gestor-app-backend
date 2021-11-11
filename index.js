require('dotenv').config();

const express=require('express');
const cors=require('cors');

const {dbConnection}=require('./database/config');
const routeCursos = require('./routes/cursos');

//Crear el servidor de express
const app=express();




//Configurar cors
app.use(cors())
app.use(express.json())
app.use(routeCursos)

//Conexion a la base de datos
dbConnection();


app.listen(process.env.PORT,() => {
    console.log('Server run' + process.env.PORT);
})

console.log("holaaaaaaaaa");

require('dotenv').config();

const express=require('express');
const cors=require('cors');

const {dbConnection}=require('./database/config');
// const routeCursos = require('./routes/cursos');


//Crear el servidor de express
const app=express();

//Configurar cors
app.use(cors())
//Lectura y parseo de body
app.use(express.json())

//Conexion a la base de datos
dbConnection();


const routes_docente = require('./routes/docente');

app.use('/api/docentes', routes_docente);





//joel
app.use('/api/cursos',require('./routes/cursos'))
app.use('/api/matriculas',require('./routes/matricula'));


app.listen(process.env.PORT,()=>{
    console.log('Server run' + process.env.PORT);
})

console.log("holaaaaaaaaa");

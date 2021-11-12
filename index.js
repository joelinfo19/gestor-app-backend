require('dotenv').config();

const express=require('express');
const cors=require('cors');

const {dbConnection}=require('./database/config');
// const routeCursos = require('./routes/cursos');


//Crear el servidor de express
const app=express();


//Lectura y parseo de body
app.use(express.json())


//Configurar cors
app.use(cors())
app.use(express.json())
// app.use(routeCursos)

//Conexion a la base de datos
dbConnection();


const routes_docente = require('./routes/docente');

app.use('/api', routes_docente);





//joel
app.use('/api/cursos',require('./routes/cursos'))
app.use('/api/matriculas',require('./routes/matricula'));


app.listen(process.env.PORT,()=>{
    console.log('Server run' + process.env.PORT);
})

console.log("holaaaaaaaaa");

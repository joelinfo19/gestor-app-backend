require('dotenv').config();

const express=require('express');
const cors=require('cors');

const {dbConnection}=require('./database/config');




//Crear el servidor de express
const app=express();

//Configurar cors
app.use(cors())
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//Conexion a la base de datos
dbConnection();


const routes_docente = require('./routes/docente');

app.use('/api', routes_docente);







app.listen(process.env.PORT,()=>{
    console.log('Server run' + process.env.PORT);
})

console.log("holaaaaaaaaa");

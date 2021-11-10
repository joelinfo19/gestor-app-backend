require('dotenv').config();

const express=require('express');
const cors=require('cors');

const {dbConnection}=require('./database/config');



//Crear el servidor de express
const app=express();

//Configurar cors
app.use(cors())


//Conexion a la base de datos
dbConnection();



//joel
//yaniez
//aldaco





app.listen(process.env.PORT,()=>{
    console.log('Server run' + process.env.PORT);
})

console.log("holaaaaaaaaa");

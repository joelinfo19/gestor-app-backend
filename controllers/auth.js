const{response}=require('express')
const Docente = require('../models/docente');
const bcrypt=require('bcrypt');
const { menuFront } = require('../helpers/menu-frontend');


const login= async (req,res=response)=>{
    const {email,contrasenia}=req.body;
   
    try {
        const docenteDB=  await Docente.findOne({email});
        // matricula.docente[0].asistencias[0].date instanceof Date;
        // matricula.alumno[0].asistencias[0].date instanceof Date;
        // await matricula.save();

        // console.log(docente[0].codDocente)

        // console.log(req.body)
        if(!docenteDB){
            return res.status(404).json({
                ok:false,
                msg:"Email no encontrado en la db"
            })
        }
        const passwordDB= bcrypt.compareSync(contrasenia,docenteDB.contrasenia)  
        if(!passwordDB){
            return res.status(400).json({
                ok:false,
                msg:"Contrasenia no valida"
            })
        }        


        res.json({
            ok:true,
            msg:'Login exito',
            menu:menuFront(docenteDB.esAdmin)
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:"Error inesperado"
        })
    }
    

}
module.exports={
    login
}

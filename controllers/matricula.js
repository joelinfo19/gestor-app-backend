const { response } = require('express')
const Matricula=require('../models/matricula')




const getMatriculas=async (req,res)=>{


    const matriculas=await Matricula.find({},'docente alumno')
    res.json({
        ok:true,
        matriculas
    })

}

// docente:[{
//     codDocente:String,
//     asistencias:[{
//         date:Date,
//         flag:Boolean

//     }],
// }],
// alumno:[{
//     nombre:String,
//     asistencias:[{
//         date:Date,
//         flag:Boolean      
//     }],
    
// }],
// curso:{
//     type:Schema.Types.ObjectId,
//     ref:'Curso',
//     required:true
    
// }
const crearMatricula= async (req,res)=>{
    const {usuario,docente,alumno,curso}=req.body;
   
    try {
        const matricula= new Matricula(req.body);
        // matricula.docente[0].asistencias[0].date instanceof Date;
        // matricula.alumno[0].asistencias[0].date instanceof Date;
        await matricula.save();

        console.log(docente[0].codDocente)

        console.log(req.body)
        res.json({
            ok:true,
            matricula
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:"Error inesperado"
        })
    }
    

}
const actualizarMatricula= async (req,res=response)=>{
    const uid=req.params.id;
    try {
        const matriculaDB= await Matricula.findById(uid);
        if(!matriculaDB){
            return res.status(404).json({
                ok:false,
                msg:"No existe la matricula con ese id"
            })
        }

        // update
        const campos=req.body
        const matriculaActualizada= await Matricula.findByIdAndUpdate(uid,campos,{new:true})
        res.json({
            ok:true,
            matricula:matriculaActualizada,
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:"Error inesperado"
        })
        
    }

}
const borrarMatricula= async (req,res=response)=>{
    const uid=req.params.id;
    try {
        const matriculaDB= await Matricula.findById(uid);
        if(!matriculaDB){
            return res.status(404).json({
                ok:false,
                msg:"No existe la matricula con ese id"
            })
        }

        // update
        
        await Matricula.findByIdAndDelete(uid)
        res.json({
            ok:true,
            msg:"Matricula eliminada",
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
    getMatriculas,
    crearMatricula,
    actualizarMatricula,
    borrarMatricula
}
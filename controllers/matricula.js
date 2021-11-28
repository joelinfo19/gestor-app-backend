const { response } = require('express')
const Matricula=require('../models/matricula')




const getMatriculas=async (req,res)=>{


    const matriculas=await Matricula.find()
        .populate('usuario','nombre apellido')
        .populate('curso')
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
const crearMatricula= async (req,res=response)=>{
    const uid=req.uid
    const matricula=new Matricula({
        user:uid,
        ...req.body
    })

   
    try {
        console.log('estos es'+uid)
        // const matricula= new Matricula(req.body);
        // matricula.docente[0].asistencias[0].date instanceof Date;
        // matricula.alumno[0].asistencias[0].date instanceof Date;
        const matriculaDB=await matricula.save()


        // console.log(docente[0].codDocente)

        console.log(req.body)
        res.json({
            ok:true,
            matricula:matriculaDB
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
    const uid=req.uid
    const id=req.params.id;
    try {
        const matriculaDB= await Matricula.findById(id);
        if(!matriculaDB){
            return res.status(404).json({
                ok:false,
                msg:"No existe la matricula con ese id"
            })
        }

        // update
        const cambiosMatricula={
            ...req.body,
            user:uid
        }
        const matriculaActualizada= await Matricula.findByIdAndUpdate(id,cambiosMatricula,{new:true})
        res.json({
            ok:true,
            msg:'Matricula Actualizada',
            matricula:matriculaActualizada
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
    const id=req.params.id;
    try {
        const matriculaDB= await Matricula.findById(id);
        if(!matriculaDB){
            return res.status(404).json({
                ok:false,
                msg:"No existe la matricula con ese id"
            })
        }

        // update
        
        await Matricula.findByIdAndDelete(id)
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

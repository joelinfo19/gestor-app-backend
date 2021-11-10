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

}
const actualizarMatricula= async (req,res)=>{
    const {docente,alumno,curso}=req.body;
   
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

}





module.exports={
    getMatriculas,
    crearMatricula,
    actualizarMatricula
}
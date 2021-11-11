const {Schema,model}=require('mongoose')

// userCod  instead of coddocent error
// reference in user to docente
const MatriculaSchema=Schema({

    usuario:{
        type:Schema.Types.ObjectId,
        ref:'Usuario',
        required:true
        // ref:'Curso',
        // required:true
    },
    docente:[{
        codDocente:String,
        asistencias:[{
            date:Date,
            flag:Boolean

        }],
    }],
    alumno:[{
        nombre:String,
        asistencias:[{
            date:Date,
            flag:Boolean      
        }],
        
    }],
    
    curso:{
        type:Schema.Types.ObjectId,
        ref:'Curso',
        required:true
    }

},{collection:'matriculas'})
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




MatriculaSchema.method('toJSON',function () {
    const {__v,_id,...object}=this.toObject()
    object.uid=_id;
    return object
})



module.exports=model('Matricula',MatriculaSchema)

const {Schema,model}=require('mongoose')

// userCod  instead of coddocent error
// reference in user to docente
const MatriculaSchema=Schema({

    usuario:{
        type:Schema.Types.ObjectId,
        ref:'Docente',
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
        ref:'Cursos',
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
    const {__v,...object}=this.toObject()
    return object
})



module.exports=model('Matricula',MatriculaSchema)

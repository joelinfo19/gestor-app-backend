const { response } = require('express')
const Matricula = require('../models/matricula')
const Cursos = require('../models/Curso')

// const code=require('../controllers/cursos')
const pupeteer= require('puppeteer');



const getMatriculas = async (req, res) => {


    const matriculas = await Matricula.find()
        .populate('usuario', 'nombre apellido')
        .populate('curso')
    res.json({
        ok: true,
        matriculas
    })

}
const getByIdMatriculas = async (req, res) => {
    const id=req.params.id

    const matriculas = await Matricula.findById(id)
        .populate('usuario', 'nombre apellido ')
        .populate('curso')
    res.json({
        ok: true,
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
const crearMatricula = async (req, res = response) => {
    const uid = req.uid
    const idCurso=req.body.curso

    const cursos = await Cursos.findById(idCurso)
    console.log(cursos.codigo);
    const alumno=await webscrap(cursos.codigo)

    // res.json(cursos)

    const matricula = new Matricula({
        user: uid,
        alumno:alumno,
        ...req.body
    })

    try {
        console.log('estos es' + uid)
        // const matricula= new Matricula(req.body);
        // matricula.docente[0].asistencias[0].date instanceof Date;
        // matricula.alumno[0].asistencias[0].date instanceof Date;
        const matriculaDB = await matricula.save()


        // console.log(docente[0].codDocente)

        console.log(req.body)
        res.json({
            ok: true,
            matricula: matriculaDB
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: "Error inesperado"
        })
    }


}
const webscrap=async (id)=>{
    const browser= await pupeteer.launch({
        args: [
            "--no-sandbox",
            "--no-zygote",
            "--single-process"
        ],
        headless:true

    });
    const page = await browser.newPage();
    await page.goto('http://ccomputo.unsaac.edu.pe/index.php?op=alcurso')
    await page.type('#curso',`${id}`)
    await page.click('#Consultar')
    await page.waitForSelector('.zpGridTypeInt')
    const enlaces = await page.evaluate(()=>{
        const elements=document.querySelectorAll('[bgcolor] td')
        const links=[]

        for (let element of elements ){
            const tmp={}
            tmp.nombre=element.innerHTML
            console.log(element)
            links.push(tmp)
        }

        return links;
    })
    // const books=[];
    // for(let enlace of enlaces){
    //     const book=await page.evaluate(()=>{
    //         const tmp={}
    //         tmp.title=document.querySelector('[bgcolor] td').innerHTML
    //         return tmp
    //     })
    //     books.push(book)
    // }
    const search = /^[A-Za-z]+/;
    const condition = new RegExp(search);
    const result =  await enlaces.filter(function (i) {
        return condition.test(i.nombre);
    });
    // console.log(enlaces)
    // console.log(books)
    // console.log(result)
    //
    // console.log(result.length)
    await browser.close()

    return result
    // await page.waitFor(3000)
    // await page.screenshot({path:'centro.jpg'})

}
const actualizarMatricula = async (req, res = response) => {
    const uid = req.uid
    const id = req.params.id;
    try {
        const matriculaDB = await Matricula.findById(id);
        if (!matriculaDB) {
            return res.status(404).json({
                ok: false,
                msg: "No existe la matricula con ese id"
            })
        }

        // update
        const cambiosMatricula = {
            ...req.body,
            user: uid
        }
        const matriculaActualizada = await Matricula.findByIdAndUpdate(id, cambiosMatricula, { new: true })
        res.json({
            ok: true,
            msg: 'Matricula Actualizada',
            matricula: matriculaActualizada
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: "Error inesperado"
        })

    }

}
const borrarMatricula = async (req, res = response) => {
    const id = req.params.id;
    try {
        const matriculaDB = await Matricula.findById(id);
        if (!matriculaDB) {
            return res.status(404).json({
                ok: false,
                msg: "No existe la matricula con ese id"
            })
        }

        // update

        await Matricula.findByIdAndDelete(id)
        res.json({
            ok: true,
            msg: "Matricula eliminada",
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: "Error inesperado"
        })

    }

}

const buscarMisCursos = async (req, res) => {
    const id = req.params.id
    const matricula = await Matricula.find({ usuario: [{ _id: id }] })
        .populate('usuario', 'nombre apellido')
        .populate('curso')
    res.json(matricula)

}
//{docente: [{codDocente: codigo}]}

const asistenciaAlumnos = (req, res) => {
  const idMatricula = req.params.id;
  const nuevas_asistencias = req.body;
  Matricula.findById(idMatricula)
    .then(matricula => {
      if(matricula){
        const arr_matricula_alumnos = matricula.alumno;
        for(let alumno_nuevo of nuevas_asistencias.asistencias){
          for(let i = 0; i < arr_matricula_alumnos.length; i++){
            console.log(arr_matricula_alumnos[i].nombre)
            console.log("m: ", alumno_nuevo.name)
            if(alumno_nuevo.name == (arr_matricula_alumnos)[i].nombre){
              arr_matricula_alumnos[i].asistencias.push(alumno_nuevo.asistencias[0]);
            }
          }
        }
        const nueva_matricula = {
          ...matricula,
          alumno: arr_matricula_alumnos
        }
        Matricula.findByIdAndUpdate(idMatricula, nueva_matricula,{new: true}, function(err, result){
          if(err){
            res.status(300).json({ok: false, message: "Error al actualizar", err})
          } else {
            res.status(200).json({ok: true, message: "Asistencia alumnos actualizada", result})
          }
        });
      } else {
        res.status(404).json({ok: false, message: 'Matrícula no encontrada'});
      }
    })
    .catch(err => res.status(404).json({ok: false, message: "Ocurrió un error en la búsqueda de matrícula", err}));
}


module.exports = {
    getMatriculas,
    crearMatricula,
    actualizarMatricula,
    borrarMatricula,
    buscarMisCursos,
    getByIdMatriculas,
  asistenciaAlumnos,
}

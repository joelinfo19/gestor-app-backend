// ruta '/api/matriculas'

const {Router}=require('express');
const { asistenciaAlumnos, getMatriculas,crearMatricula, actualizarMatricula, borrarMatricula, buscarMisCursos,getByIdMatriculas } = require('../controllers/matricula');

const router=Router()

router.get('/',getMatriculas)
router.post('/',crearMatricula)
router.put('/:id',actualizarMatricula)
router.delete('/:id',borrarMatricula)
router.get('/:id', getByIdMatriculas)

router.get('/mis-cursos/:id', buscarMisCursos)
router.post('/asistencia-alumnos/:id', asistenciaAlumnos)


module.exports=router

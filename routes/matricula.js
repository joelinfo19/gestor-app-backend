// ruta '/api/matriculas'

const {Router}=require('express');
const { getMatriculas,crearMatricula, actualizarMatricula, borrarMatricula, buscarMisCursos } = require('../controllers/matricula');


const router=Router()

router.get('/',getMatriculas)
router.post('/',crearMatricula)
router.put('/:id',actualizarMatricula)
router.delete('/:id',borrarMatricula)

router.get('/mis-cursos/:id', buscarMisCursos)


module.exports=router
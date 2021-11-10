// ruta '/api/matriculas'

const {Router}=require('express');
const { getMatriculas,crearMatricula } = require('../controllers/matricula');


const router=Router()

router.get('/',getMatriculas)
router.post('/',crearMatricula)


module.exports=router
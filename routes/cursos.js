const express = require("express")
const { createCurso, getCursos, findCurso, updateCurso, deleteCurso } = require('../controllers/cursos')

const router = express.Router()

router.post('/cursos', createCurso)

//Listar cursos
router.get('/cursos', getCursos)

//Buscar curso
router.get('/cursos/:id', findCurso)

//Actualizar curso
router.put('/cursos/:id', updateCurso)

//Eliminar curso
router.delete('/cursos/:id', deleteCurso)

module.exports = router
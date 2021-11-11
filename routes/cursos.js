const express = require("express")
const { createCurso, getCursos, findCurso, updateCurso, deleteCurso } = require('../controllers/cursos')
const {Router}=require('express')

const router = Router()

router.post('/', createCurso)

//Listar cursos
router.get('/', getCursos)

//Buscar curso
router.get('/:id', findCurso)

//Actualizar curso
router.put('/:id', updateCurso)

//Eliminar curso
router.delete('/:id', deleteCurso)

module.exports = router
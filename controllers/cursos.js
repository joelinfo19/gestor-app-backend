const Cursos = require('../models/Curso')

const createCurso = (req, res) => {
    const curso = Cursos(req.body)
    curso
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}))
}

const getCursos = (req, res) => {
    Cursos
        .find()
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}))
}

const findCurso = (req, res) => {
    const {id} = req.params
    Cursos
        .findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}))
}

const updateCurso = (req, res) => {
    const {id} = req.params
    const { nombre, categoria, grupo, creditos } = req.body
    Cursos
        .updateOne({_id: id}, { $set: {nombre, categoria, grupo, creditos}})
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}))
}

const deleteCurso = (req, res) => {
    const {id} = req.params
    Cursos
        .remove({_id: id})
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}))
}

// const findCursos = (req, res) => {
//     const {nombre} = req.params
//     Cursos
//         .find({nombre: {$regex: '.*' + nombre + '.*'}})
//         .then((data) => res.json(data))
//         .catch((error) => res.json({message: error}))
// }


module.exports = {
    createCurso,
    getCursos,
    findCurso,
    updateCurso,
    deleteCurso
}
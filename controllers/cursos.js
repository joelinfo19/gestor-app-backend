const Cursos = require('../models/Curso')

const createCurso = (req, res) => {
    const curso = Cursos(req.body)
    curso
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }))
}

const getCursos = (req, res) => {
    Cursos
        .find()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }))
}

const findCurso = (req, res) => {
    const { id } = req.params
    Cursos
        .findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }))
}

const updateCurso_ = (req, res) => {
    const { id } = req.params
    const { codigo, nombre, categoria, grupo, creditos, horario, tipo } = req.body
    Cursos
        .updateOne({ _id: id }, { $set: { codigo, nombre, categoria, grupo, creditos, horario, tipo } })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }))
}
const updateCurso = (req, res) => {
    const id = req.params.id
    const cursoModificado = req.body
    Cursos
        .findByIdAndUpdate(id, cursoModificado, { new: true })
        .then(data => res.json(data))
        .catch(err => res.json({ message: err }))
}

const deleteCurso = (req, res) => {
    const { id } = req.params
    Cursos
        .remove({ _id: id })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }))
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

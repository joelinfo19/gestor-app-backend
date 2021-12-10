const multer = require('multer')
const Matricula=require('../models/matricula')
const {response}=require('express')
const path=require('path')
const fs=require('fs')
let texname='';
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/matriculas')
    },
    filename: function (req, file, cb) {
        const name=`${Date.now()}-${file.originalname}`
        cb(null, `${name}`)
        texname= name
    }
})

const upload = multer({ storage: storage })
// console.log(upload)
exports.upload = upload.single('myFile')

exports.uploadFile = async (req, res) => {
    const id=req.params.id;

    const matricula=await Matricula.findById(id)
    if (!matricula){
        console.log('No es una matricula por id')
        return false
    }
    matricula.silabus=texname
    await matricula.save()
    // console.log(__dirname)
    console.log(matricula)
    console.log(texname)
    // matricula.silabus=file

    res.send({ data: 'Enviar un archivo' })
}
exports.getFile=(req,res=response)=>{
    const pdf=req.params.pdf
    const pathPdf=path.join(__dirname,`../uploads/matriculas/${pdf}`)
    if(fs.existsSync(pathPdf)){
        res.sendFile(pathPdf)

    }else{
        const pathImg=path.join(__dirname,`../uploads/matriculas/NADA.pdf`)
        res.sendFile(pathImg)

    }
}


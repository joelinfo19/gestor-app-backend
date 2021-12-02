const Docente = require('../models/docente');
const {response} = require('express');
const validator = require('validator');
const bcrypt=require('bcrypt');
var fs = require('fs');
var path = require('path');
const jwt = require('jsonwebtoken');
const config = require('../helpers/config');


function extensionNoValida(file_text){
  return file_text != 'png' && file_text != "jpg" && file_text != 'jpeg';
}


var controller = {

  crearDocente: async (req, res)=> {
    const {email,contrasenia}=req.body;
    const uid = req.uid;
    console.log(uid);
    const docente = new Docente({
      usuario: uid,
      ...req.body
    });
    try{
      const validateEmail=await Docente.findOne({email})
      if(validateEmail){
        return res.status(400).json({
          ok:false,
          msg:'El correo ya existe'
        })
      }
      
      const salt = bcrypt.genSaltSync();
      docente.contrasenia = bcrypt.hashSync(contrasenia, salt);
      const docenteDB = await docente.save();

      const token = jwt.sign({id: docenteDB.id}, config.secret, {
        expiresIn: 60 * 60 * 24,
      })
      
      res.json({
        ok: true,
        docente: docenteDB,
        token,
      });
    }catch(error) {
      console.log(error)
      res.status(500).json({
        ok:false,
        msg: 'no se pudo guardar el docente'
      });
    }
  },

  actualizarDocente: async (req, res=response) => {
    const id = req.params.id;
    const uid = req.uid;
    console.log(uid)
    try{
      const docenteDB = await Docente.findById(id);
      if(!docenteDB){
        return res.status(404).json({
          oj: true,
          msg: "Docente no encontrado en la base de datos",
        });
      }
      const cambiosDocente = {
        ...req.body,
        usuario: uid
      };
      const docenteActualizado = await Docente.findByIdAndUpdate(id, cambiosDocente,{new:true});
      res.json({
        ok: true,
        msg: "Docente actualizado",
        docente: docenteActualizado,
      });
    }catch(error) {
      console.log(error)
      res.status(500).json({
        ok: false,
        msg: "No se pudo guardar el docente",
      });
    }
  },


  borrarDocente : async (req, res) => {
    const id = req.params.id;
    try{
      const docenteDB = await Docente.findById(id);
      if(!docenteDB){
        return res.status(404).json({
          ok: true,
          msg: "Docente no encontrado por id",
        });
      }
      await Docente.findByIdAndDelete(id);
      res.json({
        ok: true,
        msg: "Docente eliminado",
      });
    }catch(error) {
      console.log(error)
      res.status(500).json({
        ok: false,
        msg: "No se pudo eliminar el docente",
      })
    }
  },


  listarDocentes: async (req, res) => {
    const token = req.headers['x-access-token'];
    if(!token){
      return res.status(401).json({
        auth: false,
        message: "Token no proporcionado",
      })
    }


    var last = req.params.last;
    var query = Docente.find({});
    if(last || last != undefined){
      query.limit(parseInt(last));
    }
    //Find
    query.sort('-_id').exec((err, docentes) => {
      if(err){
        return res.status(500).json({
          ok: false,
          msg: "Error al devolver docentes"
        });
      }
      if(!docentes){
        return res.status(404).json({
          ok: true,
          msg: "No hay docentes para mostrar"
        });
      }
      return res.status(200).json({
        ok: true,
        docentes
      })
    })
  },

  upload: (req, res) => {
    // verificar si existe el fichero
    if(!req.files){
      return res.status(404).json({
        ok: false,
        msg: "Imagen no subida",
      });
    }
    
    //conseguir nombre y extensión del archivo
    var file_path = req.files.img.path;
    var file_split = file_path.split('/');
    var file_name = file_split[2]; // nombre del archivo
    var extension_split = file_name.split('.');
    var file_ext = extension_split[1]; // extension del archivo

    if(extensionNoValida(file_ext)){
      // borrar imagen que se almacenó en el back
      fs.unlink(file_path, (err) => {
        if(err){
          res.status(404).json({
            ok: false,
            msg: "No se logró guardar la imagen",
          });
        }
        res.status(200).json({
          ok: false,
          msg: 'la extensión de la imagen no es válida',
        });
      })
    } else {
      //buscamos el docente
      var docenteId = req.params.id;
      Docente.findOneAndUpdate({_id: docenteId}, {img: file_name}, {new: true}, (err, docenteUpdate) => {
        if( err || !docenteUpdate ){
          return res.status(200).json({
            ok: false,
            msg: 'Error al guardar la imagen del docente',
          });
        }
        return res.status(200).json({
          ok: true,
          msg: 'El docente se guardó satisfactoriamente',
          newDocente: docenteUpdate,
        })
      })
    }
  },

}

module.exports = controller;

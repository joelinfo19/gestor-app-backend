const Docente = require('../models/docente');
const {response} = require('express');
const validator = require('validator');
const bcrypt=require('bcrypt');




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
      
      res.json({
        ok: true,
        docente: docenteDB
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

}

module.exports = controller;

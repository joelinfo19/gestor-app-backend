// ruta '/api/matriculas'

const {Router}=require('express');
const controller = require('../controllers/uploads');


const router=Router()

router.put('/:id',controller.upload,controller.uploadFile)
router.get('/:pdf',controller.getFile)
module.exports=router

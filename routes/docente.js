const { Router } = require('express');
var controller = require('../controllers/docente');

var router = Router();


// Para administrar imágenes
var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir: './uploads/docentes'});


router.post('/', controller.crearDocente);
router.delete('/:id', controller.borrarDocente);
router.put('/:id', controller.actualizarDocente);
router.get('/:last?', controller.listarDocentes);
router.post('/upload_image/:id', md_upload,controller.upload);


module.exports = router;

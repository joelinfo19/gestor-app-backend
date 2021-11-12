var express = require('express');
var controller = require('../controllers/docente');

var router = express.Router();

const app = express();


router.post('/', controller.crearDocente);
router.delete('/:id', controller.borrarDocente);
router.put('/:id', controller.actualizarDocente);
router.get('/:last?', controller.listarDocentes);


module.exports = router;

import { Router } from 'express';
import * as autorController from '../controllers/autoresControllers.js';
import { createAutorValidators, runValidations } from '../middlewares/validators.js';

const router = Router();

router.get('/', autorController.getObtenerTodosLosAutores);
router.get('/buscarPorCorreo/:correo', autorController.getObtenerPorCorreo);
router.get('/buscarPorNombre/:nombre', autorController.getBuscarPorNombre);
router.post('/', runValidations(createAutorValidators), autorController.postCrearAutor);
router.put('/:id_autor', autorController.putActualizarAutor);
router.delete('/:id_autor', autorController.deleteEliminarAutor);

export default router;

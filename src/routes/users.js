import { Router } from 'express';
import * as controller from '../controllers/autoresControllers.js'; // 👈 UNO SOLO
import { 
  createAutorValidators, 
  createCategoriaValidators, 
  createLibroValidators, 
  runValidations 
} from '../middlewares/validators.js';

const router = Router();

router.get('/autores', controller.getObtenerTodosLosAutores);
router.get('/autores/buscarPorCorreo/:correo', controller.getObtenerPorCorreo);
router.get('/autores/buscarPorNombre/:nombre', controller.getBuscarPorNombre);
router.post('/autores', runValidations(createAutorValidators), controller.postCrearAutor);
router.put('/autores/:id_autor', controller.putActualizarAutor);
router.delete('/autores/:id_autor', controller.deleteEliminarAutor);

router.get('/categorias', controller.getObtenerTodasLasCategorias);
router.post('/categorias', runValidations(createCategoriaValidators), controller.postCrearCategoria);
router.put('/categorias/:id_categoria', controller.putActualizarCategoria);
router.delete('/categorias/:id_categoria', controller.deleteEliminarCategoria);

router.get('/libros', controller.getObtenerTodosLosLibros);
router.post('/libros', runValidations(createLibroValidators), controller.postCrearLibro);
router.put('/libros/:id_libro', controller.putActualizarLibro);
router.delete('/libros/:id_libro', controller.deleteEliminarLibro);
router.get('/libros/anio/:anio', controller.getLibrosPorAnio);
router.get('/libros/autor/:autor_id', controller.getLibrosPorAutor);
router.get('/libros/categoria/:categoria_id', controller.getLibrosPorCategoria);
router.get('/libros/clasificacion/:clasificacion', controller.getLibrosPorClasificacion);

export default router;


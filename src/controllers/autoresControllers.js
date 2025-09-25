
import * as autorService from '../services/usersServices.js';

export const getObtenerTodosLosAutores = async (req, res) => {
  const autores = await autorService.getAllAutores();
  res.json(autores);
};

export const getObtenerPorCorreo = async (req, res) => {
  const { correo } = req.params;
  const autor = await autorService.getAutorByCorreo(correo);
  res.json(autor);
};

export const getBuscarPorNombre = async (req, res) => {
  const { nombre } = req.params;
  const autor = await autorService.getBuscarAutorPorNombre(nombre);
  res.json(autor);
};

export const postCrearAutor = async (req, res) => {
  const { nombre, nacionalidad, biografia, correo } = req.body;
  const nuevoAutor = await autorService.postCrearAutor(nombre, nacionalidad, biografia, correo); 
  res.status(201).json(nuevoAutor);
};

export const putActualizarAutor = async (req, res) => {
  const { id_autor } = req.params;
  const { nombre, nacionalidad, biografia, correo } = req.body;
  const autorActualizado = await autorService.actualizarAutor(id_autor, nombre, nacionalidad, biografia, correo);
  res.json(autorActualizado);
};

export const deleteEliminarAutor = async (req, res) => {
  const { id_autor } = req.params;
  await autorService.eliminarAutor(id_autor); 
  res.sendStatus(204);
};

export const getObtenerTodasLasCategorias = async (req, res, next) => {
  try {
    const categorias = await autorService.getAllCategorias();
    res.json(categorias);
  } catch (error) {
    next(error);
  }
};

export const postCrearCategoria = async (req, res, next) => {
  try {
    const { nombre_categoria, clasificacion } = req.body;
    const nuevaCategoria = await autorService.postCrearCategoria(nombre_categoria, clasificacion);
    res.status(201).json(nuevaCategoria);
  } catch (error) {
    next(error);
  }
};

export const putActualizarCategoria = async (req, res, next) => {
  try {
    const { id_categoria } = req.params;
    const { nombre_categoria, clasificacion } = req.body;
    const categoriaActualizada = await autorService.actualizarCategoria(
      id_categoria,
      nombre_categoria,
      clasificacion
    );
    res.json(categoriaActualizada);
  } catch (error) {
    next(error);
  }
};

export const deleteEliminarCategoria = async (req, res, next) => {
  try {
    const { id_categoria } = req.params;
    await autorService.eliminarCategoria(id_categoria);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

export const getObtenerTodosLosLibros = async (req, res, next) => {
  try {
    const libros = await autorService.getAllLibros();
    res.json(libros);
  } catch (error) {
    next(error);
  }
};

export const postCrearLibro = async (req, res, next) => {
  try {
    const { titulo, resumen, anio_publicacion, autor_id, categoria_id } = req.body;

    const nuevoLibro = await autorService.postCrearLibro(
      titulo,
      anio_publicacion,
      resumen,
      autor_id,
      categoria_id
    );

    res.status(201).json(nuevoLibro);
  } catch (error) {
    next(error);
  }
};

export const putActualizarLibro = async (req, res, next) => {
  try {
    const { id_libro } = req.params;
    const { titulo, anio_publicacion, resumen, autor_id, categoria_id } = req.body;

    const libroActualizado = await autorService.actualizarLibro(
      id_libro,
      titulo,
      anio_publicacion,
      resumen,
      autor_id,
      categoria_id
    );

    res.json(libroActualizado);
  } catch (error) {
    next(error);
  }
};

export const deleteEliminarLibro = async (req, res, next) => {
  try {
    const { id_libro } = req.params;
    await autorService.eliminarLibro(id_libro);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};



export const getLibrosPorAnio = async (req, res, next) => {
  try {
    const { anio } = req.params;
    const libros = await autorService.getLibrosPorAnio(anio);
    res.json(libros);
  } catch (error) {
    next(error);
  }
};

export const getLibrosPorAutor = async (req, res, next) => {
  try {
    const { autor_id } = req.params;
    const libros = await autorService.getLibrosPorAutor(autor_id);
    res.json(libros);
  } catch (error) {
    next(error);
  }
};


export const getLibrosPorCategoria = async (req, res, next) => {
  try {
    const { categoria_id } = req.params;
    const libros = await autorService.getLibrosPorCategoria(categoria_id);
    res.json(libros);
  } catch (error) {
    next(error);
  }
};

export const getLibrosPorClasificacion = async (req, res, next) => {
  try {
    const { clasificacion } = req.params;
    const libros = await autorService.getLibrosPorClasificacion(clasificacion);
    res.json(libros);
  } catch (error) {
    next(error);
  }
};

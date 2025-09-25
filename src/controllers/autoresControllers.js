
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

// ====== CATEGORÍAS ======

// Obtener todas las categorías
export const getObtenerTodasLasCategorias = async (req, res, next) => {
  try {
    const categorias = await autorService.getAllCategorias();
    res.json(categorias);
  } catch (error) {
    next(error);
  }
};

// Crear categoría
export const postCrearCategoria = async (req, res, next) => {
  try {
    const { nombre, descripcion } = req.body;
    const nuevaCategoria = await autorService.postCrearCategoria(nombre, descripcion);
    res.status(201).json(nuevaCategoria);
  } catch (error) {
    next(error);
  }
};

// Actualizar categoría
export const putActualizarCategoria = async (req, res, next) => {
  try {
    const { id_categoria } = req.params;
    const { nombre, descripcion } = req.body;
    const categoriaActualizada = await autorService.actualizarCategoria(id_categoria, nombre, descripcion);
    res.json(categoriaActualizada);
  } catch (error) {
    next(error);
  }
};

// Eliminar categoría
export const deleteEliminarCategoria = async (req, res, next) => {
  try {
    const { id_categoria } = req.params;
    await autorService.eliminarCategoria(id_categoria);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};


// ====== LIBROS ======

// Obtener todos los libros
export const getObtenerTodosLosLibros = async (req, res, next) => {
  try {
    const libros = await autorService.getAllLibros();
    res.json(libros);
  } catch (error) {
    next(error);
  }
};

// Crear libro
export const postCrearLibro = async (req, res, next) => {
  try {
    const { titulo, descripcion, fecha_publicacion, id_autor, id_categoria } = req.body;
    const nuevoLibro = await autorService.postCrearLibro(
      titulo, descripcion, fecha_publicacion, id_autor, id_categoria
    );
    res.status(201).json(nuevoLibro);
  } catch (error) {
    next(error);
  }
};

// Actualizar libro
export const putActualizarLibro = async (req, res, next) => {
  try {
    const { id_libro } = req.params;
    const { titulo, descripcion, fecha_publicacion, id_autor, id_categoria } = req.body;
    const libroActualizado = await autorService.actualizarLibro(
      id_libro, titulo, descripcion, fecha_publicacion, id_autor, id_categoria
    );
    res.json(libroActualizado);
  } catch (error) {
    next(error);
  }
};

// Eliminar libro
export const deleteEliminarLibro = async (req, res, next) => {
  try {
    const { id_libro } = req.params;
    await autorService.eliminarLibro(id_libro);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
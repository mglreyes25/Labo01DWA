
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
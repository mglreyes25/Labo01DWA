import { pool } from '../db.js';

// Obtener todos los autores
export const getAllAutores = async () => {
  const result = await pool.query('SELECT * FROM autores');
  return result.rows;
};

// Buscar autor por correo
export const getAutorByCorreo = async (correo) => {
  const result = await pool.query(
    'SELECT * FROM autores WHERE correo = $1',
    [correo]
  );
  return result.rows[0];
};

// Buscar autor por nombre
export const getBuscarAutorPorNombre = async (nombre) => {
  const buscar = `%${nombre}%`;
  const result = await pool.query(
    'SELECT * FROM autores WHERE nombre ILIKE $1',
    [buscar]
  );
  return result.rows;
};

// Crear autor
export const postCrearAutor = async (nombre, nacionalidad, biografia, correo) => {
  const query = `
    INSERT INTO autores (nombre, nacionalidad, biografia, correo)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;
  const result = await pool.query(query, [nombre, nacionalidad, biografia, correo]);
  return result.rows[0];
};

// Actualizar autor
export const actualizarAutor = async (id_autor, nombre, nacionalidad, biografia, correo) => {
  const query = `
    UPDATE autores
    SET nombre = $1, nacionalidad = $2, biografia = $3, correo = $4
    WHERE id_autor = $5
    RETURNING *;
  `;
  const result = await pool.query(query, [nombre, nacionalidad, biografia, correo, id_autor]);
  if (result.rowCount === 0) {
    const error = new Error('Autor no encontrado');
    error.statusCode = 404;
    throw error;
  }
  return result.rows[0];
};

// Eliminar autor
export const eliminarAutor = async (id_autor) => {
  const autorAEliminar = await pool.query(
    'SELECT * FROM autores WHERE id_autor = $1',
    [id_autor]
  );

  if (autorAEliminar.rowCount === 0) {
    const error = new Error('Autor no encontrado');
    error.statusCode = 404;
    throw error;
  }

  await pool.query('DELETE FROM autores WHERE id_autor = $1', [id_autor]);

  return {
    message: 'Autor eliminado exitosamente',
    autor: autorAEliminar.rows[0],
  };
};

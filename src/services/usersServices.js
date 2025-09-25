import { pool } from '../db.js';

export const getAllAutores = async () => {
  const result = await pool.query('SELECT * FROM autores');
  return result.rows;
};

export const getAutorByCorreo = async (correo) => {
  const result = await pool.query(
    'SELECT * FROM autores WHERE correo = $1',
    [correo]
  );
  return result.rows[0];
};

export const getBuscarAutorPorNombre = async (nombre) => {
  const buscar = `%${nombre}%`;
  const result = await pool.query(
    'SELECT * FROM autores WHERE nombre ILIKE $1',
    [buscar]
  );
  return result.rows;
};

export const postCrearAutor = async (nombre, nacionalidad, biografia, correo) => {
  const query = `
    INSERT INTO autores (nombre, nacionalidad, biografia, correo)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;
  const result = await pool.query(query, [nombre, nacionalidad, biografia, correo]);
  return result.rows[0];
};

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

export const getAllCategorias = async () => {
  const result = await pool.query('SELECT * FROM categorias');
  return result.rows;
};

export const getCategoriaById = async (id_categoria) => {
  const result = await pool.query(
    'SELECT * FROM categorias WHERE id_categoria = $1',
    [id_categoria]
  );
  return result.rows[0];
};

export const postCrearCategoria = async (nombre_categoria, clasificacion) => {
  const query = `
    INSERT INTO categorias (nombre_categoria, clasificacion)
    VALUES ($1, $2)
    RETURNING *;
  `;
  const result = await pool.query(query, [nombre_categoria, clasificacion]);
  return result.rows[0];
};


export const actualizarCategoria = async (id_categoria, nombre_categoria, clasificacion) => {
  const query = `
    UPDATE categorias
    SET nombre_categoria = $1, clasificacion = $2
    WHERE id_categoria = $3
    RETURNING *;
  `;
  const result = await pool.query(query, [nombre_categoria, clasificacion, id_categoria]);
  if (result.rowCount === 0) throw new Error('Categoría no encontrada');
  return result.rows[0];
};

export const eliminarCategoria = async (id_categoria) => {
  const categoria = await pool.query('SELECT * FROM categorias WHERE id_categoria = $1', [id_categoria]);
  if (categoria.rowCount === 0) throw new Error('Categoría no encontrada');

  await pool.query('DELETE FROM categorias WHERE id_categoria = $1', [id_categoria]);

  return { message: 'Categoría eliminada exitosamente', categoria: categoria.rows[0] };
};

export const getAllLibros = async () => {
  const result = await pool.query('SELECT * FROM libros');
  return result.rows;
};

export const getLibroById = async (id_libro) => {
  const result = await pool.query(
    'SELECT * FROM libros WHERE id_libro = $1',
    [id_libro]
  );
  return result.rows[0];
};

export const postCrearLibro = async (titulo, anio_publicacion, resumen, autor_id, categoria_id) => {
  const query = `
    INSERT INTO libros (titulo, anio_publicacion, resumen, autor_id, categoria_id)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `;
  const result = await pool.query(query, [titulo, anio_publicacion, resumen, autor_id, categoria_id]);
  return result.rows[0];
};


export const actualizarLibro = async (id_libro, titulo, anio_publicacion, resumen, autor_id, categoria_id) => {
  const query = `
    UPDATE libros
    SET titulo = $1,
        anio_publicacion = $2,
        resumen = $3,
        autor_id = $4,
        categoria_id = $5
    WHERE id_libro = $6
    RETURNING *;
  `;
  const result = await pool.query(query, [
    titulo,
    anio_publicacion,
    resumen,
    autor_id,
    categoria_id,
    id_libro
  ]);
  return result.rows[0];
};


export const eliminarLibro = async (id_libro) => {
  const libro = await pool.query('SELECT * FROM libros WHERE id_libro = $1', [id_libro]);
  if (libro.rowCount === 0) throw new Error('Libro no encontrado');

  await pool.query('DELETE FROM libros WHERE id_libro = $1', [id_libro]);

  return { message: 'Libro eliminado exitosamente', libro: libro.rows[0] };
};
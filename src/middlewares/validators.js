import { body, validationResult } from 'express-validator';

export const runValidations = (validations) => {
  return async (req, res, next) => {
    for (const validation of validations) {
      await validation.run(req);
    }
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    return res.status(400).json({
      status: 'error',
      errors: errors.array(),
    });
  };
};

export const createUserValidators = [
  body('nombre')
    .trim()
    .notEmpty()
    .withMessage('El nombre es obligatorio'),

  body('email')
    .trim()
    .isEmail()
    .withMessage('El email no es válido'),

  body('contrasenia')
    .isLength({ min: 6 })
    .withMessage('La contraseña debe tener al menos 6 caracteres'),
];

export const createAutorValidators = [
  body('nombre')
    .trim()
    .notEmpty()
    .withMessage('El nombre es obligatorio'),

  body('correo')
    .trim()
    .isEmail()
    .withMessage('El correo no es válido'),

  body('nacionalidad')
    .optional()
    .isString()
    .withMessage('La nacionalidad debe ser texto'),

  body('biografia')
    .optional()
    .isString()
    .withMessage('La biografía debe ser texto'),
];

export const createCategoriaValidators = [
  body('nombre_categoria')
    .trim()
    .notEmpty()
    .withMessage('El nombre de la categoría es obligatorio'),

  body('clasificacion')
    .trim()
    .notEmpty()
    .withMessage('La clasificación es obligatoria'),
];

export const createLibroValidators = [
  body('titulo')
    .trim()
    .isLength({ min: 10 })
    .withMessage('El título debe tener al menos 10 caracteres'),

  body('anio_publicacion')
    .isInt({ min: 1901 })
    .withMessage('El año de publicación debe ser mayor a 1900'),

  body('autor_id')
    .notEmpty()
    .withMessage('El autor es obligatorio'),

  body('categoria_id')
    .notEmpty()
    .withMessage('La categoría es obligatoria'),

  body('resumen')
    .optional()
    .isString()
    .withMessage('El resumen debe ser texto'),
];


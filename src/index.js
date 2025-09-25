import express from 'express';
import usersRouter from './routes/users.js';
import dotenv from 'dotenv';
import { errorHandler } from './middlewares/errorHandler.js'; 

dotenv.config();
const app = express();
app.use(express.json());

// Ruta de prueba para saber si el server corre
app.get('/', (req, res) => {
  res.send('Hola mundo UNICAES! El servidor está funcionando correctamente.');
});

// Aquí montamos el router en /autores
app.use('/', usersRouter);


// Middleware para manejar errores
app.use(errorHandler);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Servidor corriendo en http://localhost:${process.env.PORT || 3000}`);
});

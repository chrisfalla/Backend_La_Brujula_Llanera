import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import process from 'node:process';
import router from './src/routes/UserRoute.js';
import authRouter from './src/routes/AuthRoute.js';
import postRouter from './src/routes/postsRoute.js';
import swaggerSpec from './swagger/swaggerConfig.js';
import swaggerUi from 'swagger-ui-express';
import categoryRouter from './src/routes/CategoryRoute.js'; // Importa correctamente el archivo de rutas

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api", router); // Usuarios
app.use("/auth", authRouter); // Login
app.use("/posts", postRouter); // Posts protegidos
app.use("/categories", categoryRouter); // ✅ Rutas de categorías correctamente registradas

// Ruta base
app.get('/', (req, res) => {
  res.send('¡API funcionando!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
  console.log(`Documentación Swagger disponible en http://localhost:${PORT}/api-docs`);
});

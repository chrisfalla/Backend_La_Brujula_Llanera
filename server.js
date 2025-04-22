import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import process from 'node:process';
import swaggerSpec from './src/interfaces/docs/swagger/swaggerConfig.js';
import swaggerUi from 'swagger-ui-express';
import categoryRouter from './src/interfaces/routes/CategoryRoute.js'; 
import tagRouter from './src/interfaces/routes/TagRoute.js';
import placeRouter from './src/interfaces/routes/PlaceRoute.js'; // Importa las rutas de lugares


const app = express();

app.use(cors());
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/categories", categoryRouter);
app.use("/tags", tagRouter);
app.use('/places', placeRouter);

// Ruta base
app.get('/', (req, res) => {
  res.send('¡API funcionando!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
  console.log(`Documentación Swagger disponible en http://localhost:${PORT}/api-docs`);
});

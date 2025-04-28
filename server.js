import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import process from 'node:process';
import swaggerSpec from './src/interfaces/docs/swagger/swaggerConfig.js';
import swaggerUi from 'swagger-ui-express';
import categoryRouter from './src/interfaces/routes/CategoryRoute.js'; 
import tagRouter from './src/interfaces/routes/TagRoute.js';
import placeRouter from './src/interfaces/routes/PlaceRoute.js'; 
import FavoriteRoute from './src/interfaces/routes/FavoriteRoute.js'; 
import FavoriteController from './src/interfaces/controllers/FavoriteController.js'; 
import FavoriteUseCase from './src/application/use-cases/FavoriteUseCase.js';
import FavoriteRepository from './src/infrastructure/repositories/FavoriteRepository.js'; 
import FavoriteModel from './src/infrastructure/models/FavoriteModel.js';

const app = express();

// Injection dependency

const favoriteModel = FavoriteModel;
const favoriteRepository = new FavoriteRepository(favoriteModel);
const favoriteUseCase = new FavoriteUseCase(favoriteRepository);
const favoriteController = new FavoriteController(favoriteUseCase);
const favoriteRoute = new FavoriteRoute(favoriteController);


// Routes 

app.use(cors());
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/categories", categoryRouter);
app.use("/tags", tagRouter);
app.use('/places', placeRouter);
app.use('/favorites', favoriteRoute.getRouter());

// Ruta base
app.get('/', (req, res) => {
  res.send('¡API funcionando!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
  console.log(`Documentación Swagger disponible en http://localhost:${PORT}/api-docs`);
});

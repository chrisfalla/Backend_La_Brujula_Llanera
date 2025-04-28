import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import process from 'node:process';
import swaggerSpec from './src/interfaces/docs/swagger/swaggerConfig.js';
import swaggerUi from 'swagger-ui-express';
import tagRouter from './src/interfaces/routes/TagRoute.js';
import placeRouter from './src/interfaces/routes/PlaceRoute.js'; 
import FavoriteRoute from './src/interfaces/routes/FavoriteRoute.js'; 
import FavoriteController from './src/interfaces/controllers/FavoriteController.js'; 
import FavoriteUseCase from './src/application/use-cases/FavoriteUseCase.js';
import FavoriteRepository from './src/infrastructure/repositories/FavoriteRepository.js'; 
import FavoriteModel from './src/infrastructure/models/FavoriteModel.js';
import categoryRouter from './src/interfaces/routes/CategoryRoute.js'; 
import CategoryController from './src/interfaces/controllers/CategoryController.js';
import CategoryUseCase from './src/application/use-cases/CategoryUseCase.js';
import CategoryRepository from './src/infrastructure/repositories/CategoryRepository.js';
import CategoryModel from './src/infrastructure/models/CategoryModel.js';

const app = express();

// Injection dependency

const favoriteModel = FavoriteModel;
const favoriteRepository = new FavoriteRepository(favoriteModel);
const favoriteUseCase = new FavoriteUseCase(favoriteRepository);
const favoriteController = new FavoriteController(favoriteUseCase);
const favoriteRoute = new FavoriteRoute(favoriteController);

// Category

const categoryModel = CategoryModel;
const categoryRepository = new CategoryRepository(categoryModel);
const categoryUseCase = new CategoryUseCase(categoryRepository);
const categoryController = new CategoryController(categoryUseCase);
const categoryRoute = new categoryRouter(categoryController);


// Routes 

app.use(cors());
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/categories", categoryRoute.getRouter());
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

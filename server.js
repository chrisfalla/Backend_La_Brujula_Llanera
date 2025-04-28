import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import process from 'node:process';
import swaggerSpec from './src/interfaces/docs/swagger/swaggerConfig.js';
import swaggerUi from 'swagger-ui-express';
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
import TagRoute from './src/interfaces/routes/TagRoute.js';
import TagController from './src/interfaces/controllers/TagController.js';
import TagUseCase from './src/application/use-cases/TagUseCase.js';
import TagRepository from './src/infrastructure/repositories/TagRepository.js';
import TagModel from './src/infrastructure/models/TagModel.js';

const app = express();

// Injection dependency

const favoriteModel = FavoriteModel;
const favoriteRepository = new FavoriteRepository(favoriteModel);
const favoriteUseCase = new FavoriteUseCase(favoriteRepository);
const favoriteController = new FavoriteController(favoriteUseCase);
const favoriteRoute = new FavoriteRoute(favoriteController);

const categoryModel = CategoryModel;
const categoryRepository = new CategoryRepository(categoryModel);
const categoryUseCase = new CategoryUseCase(categoryRepository);
const categoryController = new CategoryController(categoryUseCase);
const categoryRoute = new categoryRouter(categoryController);


const tagModel = TagModel;
const tagRepository = new TagRepository(tagModel);
const tagUseCase = new TagUseCase(tagRepository);
const tagController = new TagController(tagUseCase);
const tagRoute = new TagRoute(tagController);

// Routes 

app.use(cors());
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/categories", categoryRoute.getRouter());
app.use("/tags", tagRoute.getRouter());
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

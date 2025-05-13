import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import process from 'node:process';
import swaggerSpec from './src/interfaces/docs/swagger/swaggerConfig.js';
import swaggerUi from 'swagger-ui-express';
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
import HomeRoute from './src/interfaces/routes/HomeRoute.js';
import TagByPlaceRepository from './src/infrastructure/repositories/TagByPlaceRepository.js';
import PlaceController from './src/interfaces/controllers/HomeController.js';
import GetTopRatedPlacesByCategory from './src/application/use-cases/PromotedPlacesByCategory.js';
import GetTopRatedPlacesByTags from './src/application/use-cases/PromotedPlacesByTag.js';
import GetMoreVisitedPlaces from './src/application/use-cases/GetMoreVisitedPlaces.js';
import PlaceRepository from './src/infrastructure/repositories/PlaceRepository.js';
import AddressByPlaceRepository from './src/infrastructure/repositories/AddressByPlaceRepository.js';
import ReviewRepository from "./src/infrastructure/repositories/ReviewRepository.js";
import ImageCategoryRepository from "./src/infrastructure/repositories/ImageCategoryRepository.js";
import ImageByPlaceRepository from "./src/infrastructure/repositories/ImageByPlaceRepository.js";
import AddressRepository from './src/infrastructure/repositories/AddressRepository.js';
import LogVisitedRepository from './src/infrastructure/repositories/LogVisitedRepository.js';
import PlaceModel from './src/infrastructure/models/PlaceModel.js';
import ReviewModel from './src/infrastructure/models/ReviewModel.js';
import ImageByPlaceModel from './src/infrastructure/models/ImageByPlaceModel.js';
import ImageCategoryModel from './src/infrastructure/models/ImageCategoryModel.js';
import TagByPlaceModel from './src/infrastructure/models/TagByPlaceModel.js';
import AddressByPlaceModel from './src/infrastructure/models/AddressByPlaceModel.js';
import AddressModel from './src/infrastructure/models/AddressModel.js';
import LogVisitModel from './src/infrastructure/models/LogVisitModel.js';
import PlaceDetailUseCase from './src/application/use-cases/PlaceDetailUseCase.js';
import PlaceDetailController from './src/interfaces/controllers/PlaceDetailsController.js';
import PlaceDetailRoute  from './src/interfaces/routes/PlaceDetailsRoute.js';
import SocialMediaByPlaceRepository from './src/infrastructure/repositories/SocialMediaByPlaceRepository.js';
import SocialMediaByPlaceModel from './src/infrastructure/models/SocialMediaByPlaceModel.js';
import { compareSync } from 'bcrypt';
import UserModel from './src/infrastructure/models/UserModel.js';
import UserRepository from './src/infrastructure/repositories/UserRepository.js';
import UserController from './src/interfaces/controllers/UserController.js';
import UserRoute from './src/interfaces/routes/UserRoute.js';
import LoginUserUseCase from './src/application/use-cases/LoginUserUseCase.js';
import RegisterUserUseCase from './src/application/use-cases/RegisterUserUseCase.js';
import ForgotPasswordUseCase from './src/application/use-cases/ForgotPasswordUseCase.js';
import GetUserUseCase from './src/application/use-cases/GetUserUseCase.js';

const app = express();

// dependency injection

const tagModel = TagModel;
const placeModel = PlaceModel
const reviewModel = ReviewModel
const imageByPlaceModel = ImageByPlaceModel
const imageCategoryModel = ImageCategoryModel
const tagByPlaceModel = TagByPlaceModel
const addressByPlaceModel = AddressByPlaceModel
const addressModel = AddressModel
const logVisitModel = LogVisitModel
const categoryModel = CategoryModel;
const favoriteModel = FavoriteModel;
const socialMediaByPlaceModel = SocialMediaByPlaceModel;
const userModel = UserModel;

const tagRepository = new TagRepository(tagModel);
const tagUseCase = new TagUseCase(tagRepository);
const tagController = new TagController(tagUseCase);
const tagRoute = new TagRoute(tagController);

const categoryRepository = new CategoryRepository(categoryModel);
const categoryUseCase = new CategoryUseCase(categoryRepository);
const categoryController = new CategoryController(categoryUseCase);
const categoryRoute = new categoryRouter(categoryController);

const placeRepository = new PlaceRepository(placeModel);
const reviewRepository = new ReviewRepository(reviewModel);
const imageByPlaceRepository = new ImageByPlaceRepository(imageByPlaceModel);
const imageCategoryRepository = new ImageCategoryRepository(imageCategoryModel);
const tagByPlaceRepository = new TagByPlaceRepository(tagByPlaceModel);
const addresByPlaceRepository = new AddressByPlaceRepository(addressByPlaceModel);
const addressRepository = new AddressRepository(addressModel);
const logVisitedRepository = new LogVisitedRepository(logVisitModel);
const getMoreVisitedPlaces = new GetMoreVisitedPlaces(logVisitedRepository, placeRepository, imageByPlaceRepository, imageCategoryRepository);
const getTopRatedPlacesByTags = new GetTopRatedPlacesByTags(tagByPlaceRepository, placeRepository, imageByPlaceRepository, reviewRepository, imageCategoryRepository, addressRepository, addresByPlaceRepository, tagRepository, categoryRepository);
const getTopRatedPlacesByCategory = new GetTopRatedPlacesByCategory(placeRepository, reviewRepository, imageByPlaceRepository, imageCategoryRepository);
const placeController = new PlaceController(getTopRatedPlacesByCategory, getTopRatedPlacesByTags, getMoreVisitedPlaces);
const homeRoute = new HomeRoute(placeController);

const favoriteRepository = new FavoriteRepository(favoriteModel);
const favoriteUseCase = new FavoriteUseCase(favoriteRepository);
const favoriteController = new FavoriteController(favoriteUseCase);
const favoriteRoute = new FavoriteRoute(favoriteController);

const socialMediaByPlaceRepository = new SocialMediaByPlaceRepository(socialMediaByPlaceModel);
const placeDetailUseCase = new PlaceDetailUseCase(placeRepository, categoryRepository, imageCategoryRepository, imageByPlaceRepository, reviewRepository, socialMediaByPlaceRepository);
const placeDetailController = new PlaceDetailController(placeDetailUseCase);
const placeDetailRoute = new PlaceDetailRoute(placeDetailController);

const userRepository = new UserRepository(userModel);
const getUserUseCase = new GetUserUseCase(userRepository);
const registerUserUseCase = new RegisterUserUseCase(userRepository);
const loginUserUseCase = new LoginUserUseCase(userRepository);
const forgotPasswordUseCase = new ForgotPasswordUseCase(userRepository);
const userController = new UserController(loginUserUseCase, registerUserUseCase, forgotPasswordUseCase, getUserUseCase);
const userRoute = new UserRoute(userController);


// Routes 
app.use(cors());
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/categories", categoryRoute.getRouter());
app.use("/tags", tagRoute.getRouter());
app.use('/home', homeRoute.getRouter());
app.use('/favorites', favoriteRoute.getRouter());
app.use('/placeDetail', placeDetailRoute.getRouter());
app.use('/user', userRoute.getRouter());

// Ruta base
app.get('/', (req, res) => {
  res.send('¡API funcionando!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
  console.log(`Documentación Swagger disponible en http://localhost:${PORT}/api-docs`);
});

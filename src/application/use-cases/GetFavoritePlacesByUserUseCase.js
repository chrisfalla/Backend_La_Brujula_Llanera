export default class GetFavoritePlacesByUserUseCase {
    constructor(
      placeRepository,
      reviewRepository,
      imageByPlaceRepository,
      imageCategoryRepository,
      favoriteRepository
    ) {
      this.placeRepository = placeRepository;
      this.reviewRepository = reviewRepository;
      this.imageByPlaceRepository = imageByPlaceRepository;
      this.imageCategoryRepository = imageCategoryRepository;
      this.favoriteRepository = favoriteRepository;
    }
  
    async GetFavoritePlaces(userId) {
      // Obtener favoritos del usuario
      const favoritePlaces = await this.favoriteRepository.getFavoritesByUserId(userId);
      const placeIds = favoritePlaces.map(favorite => favorite.idPlaceFk);
  
      // Obtener lugares, reseñas e imágenes
      const places = await this.placeRepository.getPlacesByIds(placeIds);
      const reviews = await this.reviewRepository.getReviewsByPlaceIds(placeIds);
      const imageCategory = await this.imageCategoryRepository.getImageCategoryByName("SmallCard");
      const imagesByPlace = await this.imageByPlaceRepository.getImagesByPlaceIds(
        placeIds,
        imageCategory.idImageCategory
      );
  
      // Calcular promedio de ratings
      const ratingMap = new Map();
      for (const review of reviews) {
        const { idPlaceFk, ratingValue } = review;
        if (!ratingMap.has(idPlaceFk)) {
          ratingMap.set(idPlaceFk, { total: 0, count: 0 });
        }
        const data = ratingMap.get(idPlaceFk);
        data.total += ratingValue;
        data.count += 1;
      }
  
      const avgRatings = new Map();
      for (const [placeId, { total, count }] of ratingMap.entries()) {
        avgRatings.set(placeId, total / count);
      }

      const imagesMap = new Map();
      imagesByPlace.forEach(image => {
        if (!imagesMap.has(image.idPlaceFk)) {
          imagesMap.set(image.idPlaceFk, {
            urlImage: image.urlImage,
            idPlaceFk: image.idPlaceFk,
            idImageCategorieFk: image.idImageCategorieFk,
          });
        }
      });

      const placesWithImages = places.map(place => {
        const image = imagesMap.get(place.idPlace);
        return {
          ...place,
          image: image ? {
            categoryId: image.idImageCategorieFk,
            categoryName: imageCategory.name,
            url: image.urlImage
          } : null
        };
      });

      const result = placesWithImages.map(place => {
        const avg = avgRatings.get(place.idPlace) || 0;
        return {
          idPlace: place.idPlace,
          name: place.name,
          rating: avg,
          image: place.image
        };
      });

      return {
        userId,
        totalFavorites: result.length,
        places: result
      };
    }
  }
  
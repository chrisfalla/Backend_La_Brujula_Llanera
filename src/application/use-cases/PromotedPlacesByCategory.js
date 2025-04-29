import PromotedPlacesByCategoryDTO from '../DTOs/PromotedPlacesByCategoryDTO.js';

export default class PromotedPlacesByCategory {
  constructor(placeRepository, reviewRepository, imageByPlaceRepository, imageCategoryRepository) {
    this.placeRepository = placeRepository;
    this.reviewRepository = reviewRepository;
    this.imageByPlaceRepository = imageByPlaceRepository;
    this.imageCategoryRepository = imageCategoryRepository;
  }

  async execute(idCategory) {
    const imageCategory = await this.imageCategoryRepository.getImageCategoryByName("Principal");
    const places = await this.placeRepository.getPlacesByCategory(idCategory);

    if (!imageCategory) return [];
    if (!places.length) return [];

    // Ordenar places alfabéticamente por nombre
    const sortedPlaces = [...places].sort((a, b) => a.name.localeCompare(b.name)).slice(0, 2);
    const placeIds = sortedPlaces.map(p => p.idPlace);

    const reviews = await this.reviewRepository.getReviewsByPlaceIds(placeIds);
    const images = await this.imageByPlaceRepository.getImagesByPlaceIds(placeIds, imageCategory.idImageCategory);

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

    // Mapear places a DTO incluyendo promedio si existe
    const imageMap = new Map();
    for (const img of images) {
      if (!imageMap.has(img.idPlaceFk)) {
        imageMap.set(img.idPlaceFk, img.urlImage);
      }
    }

    return sortedPlaces.map(p => {
      const avg = avgRatings.get(p.idPlace) || 0;
      return new PromotedPlacesByCategoryDTO(
        p.idPlace,
        avg,
        p.name,
        imageCategory.name,
        imageMap.get(p.idPlace) || null
      );
    });
  }
}

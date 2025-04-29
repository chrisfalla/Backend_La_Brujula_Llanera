import RatingStarsByCategory from '../DTOs/RatingStarsByCategory.js';

export default class GetTopRatedPlacesByCategory {
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

    const placeIds = places.map(p => p.idPlace);
    const reviews = await this.reviewRepository.getReviewsByPlaceIds(placeIds);
    const images = await this.imageByPlaceRepository.getImagesByPlaceIds(placeIds, imageCategory.idImageCategory);

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

    const avgRatings = [...ratingMap.entries()].map(([placeId, { total, count }]) => ({
      placeId,
      avg: total / count,
    }));

    const topRatings = avgRatings
      .sort((a, b) => b.avg - a.avg)
      .slice(0, 2);

    const topPlaceIds = topRatings.map(r => r.placeId);

    const imageMap = new Map();
    for (const img of images) {
      if (!imageMap.has(img.idPlaceFk)) {
        imageMap.set(img.idPlaceFk, img.urlImage); 
      }
    }

    return places
      .filter(p => topPlaceIds.includes(p.idPlace))
      .map(p => {
        const avgObj = topRatings.find(r => r.placeId === p.idPlace);
        return new RatingStarsByCategory(
          p.idPlace,
          avgObj ? avgObj.avg : 0,
          p.name,
          imageCategory.name,
          imageMap.get(p.idPlace) || null
        );
      });
  }
}

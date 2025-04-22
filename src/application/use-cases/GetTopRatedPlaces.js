export class GetTopRatedPlaces {
  constructor(placeRepo, reviewRepo, imageRepo) {
    this.placeRepo = placeRepo;
    this.reviewRepo = reviewRepo;
    this.imageRepo = imageRepo;
  }

  async execute(idCategory) {
    const places = await this.placeRepo.getPlacesByCategory(idCategory);
    if (!places.length) return [];

    const placeIds = places.map(p => p.idPlace);
    const reviews = await this.reviewRepo.getReviewsByPlaceIds(placeIds);
    const images = await this.imageRepo.getImagesByPlaceIds(placeIds);

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

    // Preparamos un mapa para acceder rápidamente a una imagen por lugar
    const imageMap = new Map();
    for (const img of images) {
      if (!imageMap.has(img.idPlaceFk)) {
        imageMap.set(img.idPlaceFk, img.urlImage); // Solo la primera imagen
      }
    }

    return places
      .filter(p => topPlaceIds.includes(p.idPlace))
      .map(p => {
        const avgObj = topRatings.find(r => r.placeId === p.idPlace);
        return {
          ...p,
          average: avgObj ? avgObj.avg : 0,
          image: imageMap.get(p.idPlace) || null
        };
      });
  }
}

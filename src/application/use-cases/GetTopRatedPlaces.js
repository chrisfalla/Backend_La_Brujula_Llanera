export class GetTopRatedPlaces {
  constructor(placeRepo, reviewRepo) {
    this.placeRepo = placeRepo;
    this.reviewRepo = reviewRepo;
  }

  async execute(idCategory) {
    const places = await this.placeRepo.getPlacesByCategory(idCategory);
    if (!places.length) return [];

    const placeIds = places.map(p => p.idPlace);
    const reviews = await this.reviewRepo.getReviewsByPlaceIds(placeIds);

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

    const topAvg = Math.max(...avgRatings.map(r => r.avg));
    const topPlaceIds = avgRatings.filter(r => r.avg === topAvg).map(r => r.placeId);

    return places.filter(p => topPlaceIds.includes(p.idPlace));
  }
}

import { TagByPlaceRepository } from '../../infrastructure/repositories/TagByPlaceRepository.js';
import { PlaceRepository } from '../../infrastructure/repositories/PlaceRepository.js';
import { ImageByPlaceRepository } from '../../infrastructure/repositories/ImageByPlaceRepository.js';
import { ReviewRepository } from '../../infrastructure/repositories/ReviewRepository.js';

export class GetTopRatedPlacesByTags {
    async execute(tagIds) {
        const tagByPlaceRepository = new TagByPlaceRepository();
        const placeRepository = new PlaceRepository();
        const imageRepository = new ImageByPlaceRepository();
        const reviewRepository = new ReviewRepository();

        // 1. Obtener relaciones Tag-Place
        const tagPlaceRelations = await tagByPlaceRepository.getPlacesByTagIds(tagIds);
        if (!tagPlaceRelations.length) return [];

        // 2. Obtener todos los IDs de lugares
        const placeIds = tagPlaceRelations.map(rel => rel.idPlaceFk);

        // 3. Obtener detalles de lugares
        const placesDetails = await placeRepository.getPlacesByIds(placeIds);

        // 4. Obtener imágenes
        const images = await imageRepository.getImagesByPlaceIds(placeIds);
        const imageMap = new Map();
        for (const img of images) {
            if (!imageMap.has(img.idPlaceFk)) {
                imageMap.set(img.idPlaceFk, img.urlImage);
            }
        }

        // 5. Obtener reviews y calcular promedios
        const reviews = await reviewRepository.getReviewsByPlaceIds(placeIds);
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

        // 6. Ordenar y quedarte con los top 2
        const topRatings = avgRatings.sort((a, b) => b.avg - a.avg).slice(0, 3);
        const topPlaceIds = topRatings.map(r => r.placeId);

        // 7. Mapear cada lugar a sus idTags (puede haber múltiples tags por lugar)
        const tagMap = new Map(); // placeId -> [idTagFk1, idTagFk2, ...]
        for (const rel of tagPlaceRelations) {
            if (!tagMap.has(rel.idPlaceFk)) {
                tagMap.set(rel.idPlaceFk, []);
            }
            tagMap.get(rel.idPlaceFk).push(rel.idTagFk);
        }

        // 8. Armar la respuesta
        const topPlaces = placesDetails.filter(p => topPlaceIds.includes(p.idPlace));
        const result = topPlaces.map(p => {
            const avgObj = topRatings.find(r => r.placeId === p.idPlace);
            return {
                ...p,
                average: avgObj ? avgObj.avg : 0,
                image: imageMap.get(p.idPlace) || null,
                idTags: tagMap.get(p.idPlace) || []  // Aquí devolvemos todas las etiquetas asociadas al lugar
            };
        });

        return result;
    }
}

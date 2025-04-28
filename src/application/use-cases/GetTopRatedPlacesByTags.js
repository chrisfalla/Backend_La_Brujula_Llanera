import { TagByPlaceRepository } from '../../infrastructure/repositories/TagByPlaceRepository.js';
import { PlaceRepository } from '../../infrastructure/repositories/PlaceRepository.js';
import { ImageByPlaceRepository } from '../../infrastructure/repositories/ImageByPlaceRepository.js';
import { ReviewRepository } from '../../infrastructure/repositories/ReviewRepository.js';
import { ImageCategoryRepository } from '../../infrastructure/repositories/ImageCategoryRepository.js';
import { AddressRepository } from '../../infrastructure/repositories/AddressRepository.js';
import { AddressByPlaceRepository } from '../../infrastructure/repositories/AddressByPlaceRepository.js';  
import TagRepository from '../../infrastructure/repositories/TagRepository.js';  
import { RatingStarsByTagsDTO } from '../DTOs/RatingStarsByTagsDTO.js';
import TagModel from '../../infrastructure/models/TagModel.js';

export class GetTopRatedPlacesByTags {
    async execute(tagIds) {
        const tagByPlaceRepository = new TagByPlaceRepository();
        const placeRepository = new PlaceRepository();
        const imageRepository = new ImageByPlaceRepository();
        const reviewRepository = new ReviewRepository();
        const imageCategoryRepository = new ImageCategoryRepository();
        const addressRepository = new AddressRepository();
        const addresByPlaceRepository = new AddressByPlaceRepository();
        const tagModel = TagModel;
        const tagRepository = new TagRepository(tagModel);

        // Obtener la categoría de imagen principal
        const imageCategory = await imageCategoryRepository.getImageCategoryByName("Principal");
        if (!imageCategory) return [];  

        // Obtener las relaciones entre etiquetas y lugares
        const tagPlaceRelations = await tagByPlaceRepository.getPlacesByTagIds(tagIds);
        if (!tagPlaceRelations.length) return []; 

        // Obtener los IDs de los lugares y las etiquetas
        const placeIds = tagPlaceRelations.map(rel => rel.idPlaceFk);
        const tagsId = tagPlaceRelations.map(rel => rel.idTagFk);

        // Obtener las etiquetas por sus IDs
        const tags = await tagRepository.getByIds(tagsId);
        if (!tags.length) return [];
        
        // Mapear los nombres de las etiquetas
        const tagNameMap = new Map();
        tags.forEach(tag => {
            if (!tagNameMap.has(tag.idTag)) {
                tagNameMap.set(tag.idTag, tag.name);
            }
        });

        // Obtener las relaciones de direcciones por lugar
        const addressByPlaceRelations = await addresByPlaceRepository.getAddressByPlaceIds(placeIds);
        const addressIds = addressByPlaceRelations.map(rel => rel.idAddressFk);
        const addresses = await addressRepository.getAddressByIds(addressIds);
        if (!addresses.length) return [];

        // Crear un mapa para acceder rápidamente a la descripción por ID de lugar
        const addressMap = new Map();
        addressByPlaceRelations.forEach(rel => {
            const address = addresses.find(a => a.idAddress === rel.idAddressFk);
            if (address) {
                addressMap.set(rel.idPlaceFk, address.description);
            }
        });

        // Obtener detalles de los lugares
        const placesDetails = await placeRepository.getPlacesByIds(placeIds);
        if (!placesDetails.length) return [];

        // Obtener las imágenes de los lugares
        const images = await imageRepository.getImagesByPlaceIds(placeIds, imageCategory.idImageCategory);
        const imageMap = new Map();
        images.forEach(img => {
            if (!imageMap.has(img.idPlaceFk)) {
                imageMap.set(img.idPlaceFk, img.urlImage);  
            }
        });

        // Obtener las reseñas de los lugares
        const reviews = await reviewRepository.getReviewsByPlaceIds(placeIds);
        const ratingMap = new Map();
        reviews.forEach(review => {
            const { idPlaceFk, ratingValue } = review;
            if (!ratingMap.has(idPlaceFk)) {
                ratingMap.set(idPlaceFk, { total: 0, count: 0 });
            }
            const data = ratingMap.get(idPlaceFk);
            data.total += ratingValue;
            data.count += 1;
        });

        // Calcular el promedio de calificaciones por lugar
        const avgRatings = [...ratingMap.entries()].map(([placeId, { total, count }]) => ({
            placeId,
            avg: total / count,
        }));

        // Ordenar los lugares por calificación promedio
        const topRatings = avgRatings.sort((a, b) => b.avg - a.avg).slice(0, 3);
        const topPlaceIds = topRatings.map(r => r.placeId);

        // Crear un mapa de lugares con sus etiquetas
        const tagMap = new Map(); 
        tagPlaceRelations.forEach(rel => {
            if (!tagMap.has(rel.idPlaceFk)) {
                tagMap.set(rel.idPlaceFk, []);
            }
            tagMap.get(rel.idPlaceFk).push(rel.idTagFk);
        });

        // Filtrar los lugares con las mejores calificaciones
        const topPlaces = placesDetails.filter(p => topPlaceIds.includes(p.idPlace));
        
        // Mapear los resultados a un DTO
        const result = topPlaces.map(p => {
            const avgObj = topRatings.find(r => r.placeId === p.idPlace);
            return new RatingStarsByTagsDTO(
                p.idPlace,
                p.name,
                addressMap.get(p.idPlace) || null,
                imageMap.get(p.idPlace) || null, 
                imageCategory.name,
                tagMap.get(p.idPlace) || [],
                (tagMap.get(p.idPlace) || []).map(idTag => tagNameMap.get(idTag)).filter(Boolean),
                avgObj ? avgObj.avg : 0,
            );
        });

        return result;
    }
}

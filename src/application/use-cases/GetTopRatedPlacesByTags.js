import { TagByPlaceRepository } from '../../infrastructure/repositories/TagByPlaceRepository.js';
import { PlaceRepository } from '../../infrastructure/repositories/PlaceRepository.js';
import { ImageByPlaceRepository } from '../../infrastructure/repositories/ImageByPlaceRepository.js';
import { ReviewRepository } from '../../infrastructure/repositories/ReviewRepository.js';
import { ImageCategoryRepository } from '../../infrastructure/repositories/ImageCategoryRepository.js';
import { AddressRepository } from '../../infrastructure/repositories/AddressRepository.js';
import { AddressByPlaceRepository } from '../../infrastructure/repositories/AddressByPlaceRepository.js';  
import { TagRepository } from '../../infrastructure/repositories/TagRepository.js';  
import { RatingStarsByTagsDTO } from '../DTOs/RatingStarsByTagsDTO.js';

export class GetTopRatedPlacesByTags {
    async execute(tagIds) {
        const tagByPlaceRepository = new TagByPlaceRepository();
        const placeRepository = new PlaceRepository();
        const imageRepository = new ImageByPlaceRepository();
        const reviewRepository = new ReviewRepository();
        const imageCategoryRepository = new ImageCategoryRepository();
        const addressRepository = new AddressRepository();
        const addresByPlaceRepository = new AddressByPlaceRepository();
        const tagRepository = new TagRepository();
        

        const imageCategory = await imageCategoryRepository.getImageCategoryByName("Principal");
        if (!imageCategory) return [];  

        const tagPlaceRelations = await tagByPlaceRepository.getPlacesByTagIds(tagIds);
        if (!tagPlaceRelations.length) return []; 

        const placeIds = tagPlaceRelations.map(rel => rel.idPlaceFk);
        const tagsId = tagPlaceRelations.map(rel => rel.idTagFk);
        const tags = await tagRepository.getByIds(tagsId);
        if (!tags.length) return [];
        const tagNameMap = new Map();
        tags.forEach(tag => {
            const tagName = tags.find(t => t.idTag === tag.idTag);
            if (!tagNameMap.has(tag.idTag)) {
                tagNameMap.set(tag.idTag, tagName.name);
            }
        }
        );

        const addressByPlaceRelations = await addresByPlaceRepository.getAddressByPlaceIds(placeIds);
        const addressIds = addressByPlaceRelations.map(rel => rel.idAddressFk);
        const addresses = await addressRepository.getAddressByIds(addressIds);
        if (!addresses.length) return [];

        // Crear un mapa para acceder rápidamente a la descripción por id
        const addressMap = new Map();
        addressByPlaceRelations.forEach(rel => {
            const address = addresses.find(a => a.idAddress === rel.idAddressFk);
            if (address) {
                addressMap.set(rel.idPlaceFk, address.description);
            }
        });

        const placesDetails = await placeRepository.getPlacesByIds(placeIds);
        if (!placesDetails.length) return [];

        const images = await imageRepository.getImagesByPlaceIds(placeIds, imageCategory.idImageCategory);
        const imageMap = new Map();
        images.forEach(img => {
            if (!imageMap.has(img.idPlaceFk)) {
                imageMap.set(img.idPlaceFk, img.urlImage);  
            }
        });

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

        const avgRatings = [...ratingMap.entries()].map(([placeId, { total, count }]) => ({
            placeId,
            avg: total / count,
        }));

        const topRatings = avgRatings.sort((a, b) => b.avg - a.avg).slice(0, 3);
        const topPlaceIds = topRatings.map(r => r.placeId);

        const tagMap = new Map(); 
        tagPlaceRelations.forEach(rel => {
            if (!tagMap.has(rel.idPlaceFk)) {
                tagMap.set(rel.idPlaceFk, []);
            }
            tagMap.get(rel.idPlaceFk).push(rel.idTagFk);
        });

        const topPlaces = placesDetails.filter(p => topPlaceIds.includes(p.idPlace));
        const result = topPlaces.map(p => {
            const avgObj = topRatings.find(r => r.placeId === p.idPlace);
            return new RatingStarsByTagsDTO(
                p.idPlace,
                p.name,
                addressMap.get(p.idPlace) || null,
                imageMap.get(p.idPlace) || null, 
                imageCategory.name,
                (tagMap.get(p.idPlace) || []).map(idTag => tagNameMap.get(idTag)).filter(Boolean),
                avgObj ? avgObj.avg : 0,
            );
        });

        return result;
    }
}

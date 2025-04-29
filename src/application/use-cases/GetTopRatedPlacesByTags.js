import RatingStarsByTagsDTO from '../DTOs/RatingStarsByTagsDTO.js';

export default class GetTopRatedPlacesByTags {
    constructor(tagByPlaceRepository, placeRepository, imageByPlaceRepository, reviewRepository, imageCategoryRepository, addressRepository, addresByPlaceRepository, tagRepository) {
        this.tagByPlaceRepository = tagByPlaceRepository;
        this.placeRepository = placeRepository;
        this.imageByPlaceRepository = imageByPlaceRepository;
        this.reviewRepository = reviewRepository;
        this.imageCategoryRepository = imageCategoryRepository;
        this.addressRepository = addressRepository;
        this.addresByPlaceRepository = addresByPlaceRepository;
        this.tagRepository = tagRepository;
    }
    async execute(tagIds) {
        const imageCategory = await this.imageCategoryRepository.getImageCategoryByName("Principal");
        if (!imageCategory) return [];  

        const tagPlaceRelations = await this.tagByPlaceRepository.getPlacesByTagIds(tagIds);
        if (!tagPlaceRelations.length) return []; 

        const placeIds = tagPlaceRelations.map(rel => rel.idPlaceFk);
        const tagsId = tagPlaceRelations.map(rel => rel.idTagFk);

        const tags = await this.tagRepository.getByIds(tagsId);
        if (!tags.length) return [];

        const tagNameMap = new Map();
        tags.forEach(tag => {
            if (!tagNameMap.has(tag.idTag)) {
                tagNameMap.set(tag.idTag, tag.name);
            }
        });

        const addressByPlaceRelations = await this.addresByPlaceRepository.getAddressByPlaceIds(placeIds);
        const addressIds = addressByPlaceRelations.map(rel => rel.idAddressFk);
        const addresses = await this.addressRepository.getAddressByIds(addressIds);
        if (!addresses.length) return [];

        const addressMap = new Map();
        addressByPlaceRelations.forEach(rel => {
            const address = addresses.find(a => a.idAddress === rel.idAddressFk);
            if (address) {
                addressMap.set(rel.idPlaceFk, address.description);
            }
        });

        const placesDetails = await this.placeRepository.getPlacesByIds(placeIds);
        if (!placesDetails.length) return [];

        const images = await this.imageByPlaceRepository.getImagesByPlaceIds(placeIds, imageCategory.idImageCategory);
        const imageMap = new Map();
        images.forEach(img => {
            if (!imageMap.has(img.idPlaceFk)) {
                imageMap.set(img.idPlaceFk, img.urlImage);  
            }
        });

        const reviews = await this.reviewRepository.getReviewsByPlaceIds(placeIds);
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
                tagMap.get(p.idPlace) || [],
                (tagMap.get(p.idPlace) || []).map(idTag => tagNameMap.get(idTag)).filter(Boolean),
                avgObj ? avgObj.avg : 0,
            );
        });

        return result;
    }
}

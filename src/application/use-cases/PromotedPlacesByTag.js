import PromotedPlacesByTagDTO from '../DTOs/PromotedPlacesByTagDTO.js';

export default class PromotedPlacesByTag {
    constructor(
        tagByPlaceRepository,
        placeRepository,
        imageByPlaceRepository,
        reviewRepository,
        imageCategoryRepository,
        addressRepository,
        addresByPlaceRepository,
        tagRepository,
        categoryRepository
    ) {
        this.tagByPlaceRepository = tagByPlaceRepository;
        this.placeRepository = placeRepository;
        this.imageByPlaceRepository = imageByPlaceRepository;
        this.reviewRepository = reviewRepository;
        this.imageCategoryRepository = imageCategoryRepository;
        this.addressRepository = addressRepository;
        this.addresByPlaceRepository = addresByPlaceRepository;
        this.tagRepository = tagRepository;
        this.categoryRepository = categoryRepository;
    }

    async execute(tagId) {
        const imageCategory = await this.imageCategoryRepository.getImageCategoryByName("Logo");
        if (!imageCategory) return [];

        const tagPlaceRelations = await this.tagByPlaceRepository.getPlacesByTagId(tagId);
        if (!tagPlaceRelations.length) return [];

        const placeIds = tagPlaceRelations.map(rel => rel.idPlaceFk);

        const tag = await this.tagRepository.getById(tagId);
        if (!tag) return [];

        const tagName = tag.name;

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

        // Obtener categorías
        const categoryIds = [...new Set(placesDetails.map(p => p.idCategorie))];
        const categories = await Promise.all(
            categoryIds.map(id => this.categoryRepository.getById(id))
        );

        const categoryMap = new Map();
        categories.forEach(cat => {
            if (cat) {
                const categoryId = cat.idCategorie || cat.id || cat.idCategory;
                if (categoryId !== undefined) {
                    categoryMap.set(categoryId, cat.name);
                }
            }
        });

        const images = await this.imageByPlaceRepository.getImagesByPlaceIds(
            placeIds,
            imageCategory.idImageCategory
        );

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

        const sortedPlaces = placesDetails
            .sort((a, b) => a.name.localeCompare(b.name))
            .slice(0, 3);

        const result = sortedPlaces.map(p => {
            const avgObj = avgRatings.find(r => r.placeId === p.idPlace);
            const categoryName = categoryMap.get(p.idCategorie) || null;

            return {
                place: new PromotedPlacesByTagDTO(
                    p.idPlace,
                    p.name,
                    addressMap.get(p.idPlace) || null,
                    imageMap.get(p.idPlace) || null,
                    imageCategory.name,
                    avgObj ? avgObj.avg : 0
                ),
                tagInfo: {
                    idTag: tagId,
                    tagName: tagName
                },
                categoryInfo: {
                    idCategory: p.idCategorie,
                    categoryName: categoryName
                }
            };
        });

        return result;
    }
}

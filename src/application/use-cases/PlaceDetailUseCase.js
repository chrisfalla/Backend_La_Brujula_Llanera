import PlaceDetailDTO from '../DTOs/PlaceDetailDTO.js';
import ImageDTO from '../DTOs/ImageDTO.js';

export default class PlaceDetailUseCase {
    constructor(placeRepository, categoryRepository, imageCategoryRepository, imageByPlaceRepository, reviewRepository) {
        this.placeRepository = placeRepository;
        this.categoryRepository = categoryRepository;
        this.imageCategoryRepository = imageCategoryRepository;
        this.imageByPlaceRepository = imageByPlaceRepository;
        this.reviewRepository = reviewRepository;
    }
    async execute(idPlace){
        const place = await this.placeRepository.getPlaceById(idPlace);
        const placeCategory = await this.categoryRepository.getById(place.idCategorie);
        const profileImage = await this.imageCategoryRepository.getImageCategoryByName("ProfileDetail");
        const galleryImage = await this.imageCategoryRepository.getImageCategoryByName("Gallery");
        if (!galleryImage) return [];
        const profileImageByPlace = await this.imageByPlaceRepository.getImageByPlaceId(place.idPlace, profileImage.idImageCategory);
        const galleryImagesByPlace = await this.imageByPlaceRepository.getImagesByPlaceId(place.idPlace, galleryImage.idImageCategory);
        const ratingStars = await this.reviewRepository.getPlaceRatingById(place.idPlace);
        const galleryImageUrls = galleryImagesByPlace.map(image => image.urlImage);
        const galleryImageIds = galleryImagesByPlace.map(image => image.idImageByPlace);
        const galleryImageDTO = new ImageDTO(galleryImageIds, galleryImage.name, galleryImageUrls);
        const profileImageDTO = new ImageDTO(profileImage.idImageCategory, profileImage.name, profileImageByPlace.urlImage);

        return new PlaceDetailDTO(
            place.idPlace,
            place.name,
            ratingStars?.averageRating || 0,
            profileImageDTO,
            galleryImageDTO,
            placeCategory.name,
            place.description
        );
    }
}
export default class PlaceDetailUseCase {
  constructor(placeRepository, categoryRepository, imageCategoryRepository, imageByPlaceRepository, reviewRepository, socialMediaByPlaceRepository) {
    this.placeRepository = placeRepository;
    this.categoryRepository = categoryRepository;
    this.imageCategoryRepository = imageCategoryRepository;
    this.imageByPlaceRepository = imageByPlaceRepository;
    this.reviewRepository = reviewRepository;
    this.socialMediaByPlaceRepository = socialMediaByPlaceRepository;
  }

  async execute(idPlace) {
    const place = await this.placeRepository.getPlaceById(idPlace);
    const placeCategory = await this.categoryRepository.getById(place.idCategorie);
    
    const profileImage = await this.imageCategoryRepository.getImageCategoryByName("ProfileDetail");
    const galleryImage = await this.imageCategoryRepository.getImageCategoryByName("Gallery");
    if (!galleryImage) return [];
  
    const profileImageByPlace = await this.imageByPlaceRepository.getImageByPlaceId(place.idPlace, profileImage.idImageCategory);
    const galleryImagesByPlace = await this.imageByPlaceRepository.getImagesByPlaceId(place.idPlace, galleryImage.idImageCategory);
    const socialMediaByPlace = await this.socialMediaByPlaceRepository.getSocialMediaByPlace(place.idPlace);
    
    const ratingStars = await this.reviewRepository.getPlaceRatingById(place.idPlace);
  
    const allImages = [
      { categoryId: profileImage.idImageCategory, url: profileImageByPlace.urlImage },
      ...galleryImagesByPlace.map(image => ({
        categoryId: galleryImage.idImageCategory,
        url: image.urlImage
      }))
    ];
  
    const socialMedia = socialMediaByPlace.map(social => ({
      typeSocialMediaId: social.idSocialMedia,
      value: social.value
    }));

    return new PlaceDetailDTO(
      place.idPlace,
      place.name,
      placeCategory.name,
      place.description,
      ratingStars?.averageRating || 0,
      allImages,
      socialMedia
    );
  }
}
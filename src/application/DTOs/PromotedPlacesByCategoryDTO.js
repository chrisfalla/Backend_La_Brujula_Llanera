export default class PromotedPlacesByCategoryDTO {
  constructor(idPlace, ratingStars, placeName, categoryName, imageUrl) {
    this.idPlace = idPlace;
    this.ratingStars = ratingStars;
    this.placeName = placeName;
    this.imageCategoryName = categoryName;
    this.imageUrl = imageUrl;
  }
}
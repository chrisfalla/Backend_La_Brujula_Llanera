export default class RatingStarsByTagsDTO {
    constructor(placeId ,placeName, placeAddess, imageUrl, imageCategoryName, ratingStars) {
        this.idPlace = placeId;
        this.placeName = placeName;
        this.placeAddess = placeAddess;
        this.imageUrl = imageUrl;
        this.imageCategoryName = imageCategoryName;
        this.ratingStars = ratingStars;
    }
}
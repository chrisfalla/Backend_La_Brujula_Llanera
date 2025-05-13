export default class RatingStarsByTagsDTO {
    constructor(placeId ,placeName, placeAddress, imageUrl, imageCategoryName, ratingStars) {
        this.idPlace = placeId;
        this.placeName = placeName;
        this.placeAddress = placeAddress;
        this.imageUrl = imageUrl;
        this.imageCategoryName = imageCategoryName;
        this.ratingStars = ratingStars;
    }
}
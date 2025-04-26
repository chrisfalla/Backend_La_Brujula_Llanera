export class RatingStarsByTagsDTO {
    constructor(placeId ,placeName, placeAddess, imageUrl, imageCategoryName, tagName, ratingStars) {
        this.idPlace = placeId;
        this.placeName = placeName;
        this.placeAddess = placeAddess;
        this.imageUrl = imageUrl;
        this.imageCategoryName = imageCategoryName;
        this.tagName = tagName;
        this.ratingStars = ratingStars;
    }
}
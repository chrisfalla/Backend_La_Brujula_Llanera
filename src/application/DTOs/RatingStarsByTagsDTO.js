export default class RatingStarsByTagsDTO {
    constructor(placeId ,placeName, placeAddess, imageUrl, imageCategoryName, tagIds, tagName, ratingStars) {
        this.idPlace = placeId;
        this.placeName = placeName;
        this.placeAddess = placeAddess;
        this.imageUrl = imageUrl;
        this.imageCategoryName = imageCategoryName;
        this.tagIds = tagIds;
        this.tagName = tagName;
        this.ratingStars = ratingStars;
    }
}
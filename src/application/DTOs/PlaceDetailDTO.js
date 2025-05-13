export default class PlaceDetailDTO {
    constructor(idPlace, placeName, categoryName, placeDescription, placeRatingStars, images, socialMedia) {
        this.idPlace = idPlace;
        this.placeName = placeName;
        this.categoryName = categoryName;
        this.placeDescription = placeDescription;  
        this.placeRatingStars = placeRatingStars;
        this.images = images;
        this.socialMedia = socialMedia;
        
    }
}
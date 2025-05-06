export default class PlaceDetailDTO {
    constructor(idPlace, placeName, placeRatingStars, images, categoryName, placeDescription) {
        this.idPlace = idPlace;
        this.placeName = placeName;
        this.categoryName = categoryName;
        this.placeDescription = placeDescription;  
        this.placeRatingStars = placeRatingStars;
        this.images = images;
        
    }
}
export default class PlaceDetailDTO {
    constructor(idPlace, placeName, placeRatingStars, profileImage, GalleryImage, categoryName, placeDescription) {
        this.idPlace = idPlace;
        this.placeName = placeName;
        this.placeRatingStars = placeRatingStars;
        this.profileImage = profileImage;
        this.GalleryImage = GalleryImage;
        this.categoryName = categoryName;
        this.placeDescription = placeDescription;  
    }
}
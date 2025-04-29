export default class MoreVisitedPlacesDTO {
    constructor(name, idPlace, visitCount, categoryName, imageUrl) {
        this.placeName = name;
        this.idPlace = idPlace;
        this.visitCount = visitCount;
        this.imageCategoryName = categoryName;
        this.imageUrl = imageUrl;
    }
}   
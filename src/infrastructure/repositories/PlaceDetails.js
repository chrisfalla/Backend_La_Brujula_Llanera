import IPlaceDetails from "../../domain/repositories/IPlaceDetails";

export default class PlaceDetails extends IPlaceDetails {
    constructor(database) {
        super();
        this.database = database;
    }
}
export class LogVisist {
    constructor(idLogVisit, idPlaceFk, idUserFk, visitDate, createdAt, updatedAt) {
        this.idLogVisit = idLogVisit;
        this.deviceDateTime = idPlaceFk;
        this.idDeviceInfoFk = idUserFk;
        this.idPlaceFk = visitDate;
        this.idUserFk = idUserFk
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
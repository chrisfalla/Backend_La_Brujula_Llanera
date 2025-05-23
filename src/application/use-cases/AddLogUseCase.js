export default class AddLogUseCase {
    constructor(logVisitRepository) {
        this.logVisitRepository = logVisitRepository;
    }

    async addLog(logVisit) {
        const logVisitByUserPlace = await this.logVisitRepository.getLogByUserPlace(logVisit.idUserFk, logVisit.idPlaceFk);
        if (logVisitByUserPlace) {
            // Retornamos false para indicar que no se agregó porque ya existe
            return false;
        }
        const newLogVisit = await this.logVisitRepository.addLogVisit(logVisit);
        if (!newLogVisit) {
            throw new Error('Failed to add log visit');
        }
        // Retornamos true para indicar que se agregó correctamente
        return true;
    }
}
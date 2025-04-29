import ILogVisitRepository from "../../domain/repositories/ILogVisitRepository.js";
import { fn, col } from 'sequelize'; 

export default class LogVisitedRepository extends ILogVisitRepository {
    constructor(logVisitModel) {
        super();
        this.logVisitModel = logVisitModel;
    }
    async getMoreVisitedPlaces() {
        const result = await this.logVisitModel.findAll({
            attributes: ['idPlaceFk', [fn('COUNT', col('idPlaceFk')), 'visitCount']],
            group: ['idPlaceFk'],
            order: [[fn('COUNT', col('idPlaceFk')), 'DESC']],
            limit: 4
        });

        return result.map(logVisit => logVisit.toJSON());
    }
}

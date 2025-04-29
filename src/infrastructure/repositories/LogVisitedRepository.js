import { ILogVisitRepository } from "../../domain/repositories/ILogVisitRepository.js";
import { LogVisitModel } from "../models/LogVisitModel.js";
import { fn, col } from 'sequelize'; 

export class LogVisitedRepository extends ILogVisitRepository {
    async getMoreVisitedPlaces() {
        const result = await LogVisitModel.findAll({
            attributes: ['idPlaceFk', [fn('COUNT', col('idPlaceFk')), 'visitCount']],
            group: ['idPlaceFk'],
            order: [[fn('COUNT', col('idPlaceFk')), 'DESC']],
            limit: 4
        });

        return result.map(logVisit => logVisit.toJSON());
    }
}

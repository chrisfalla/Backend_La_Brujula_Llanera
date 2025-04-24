import { ILogVisitRepository } from "../../domain/repositories/ILogVisit";

export class LogVisitedRepository extends ILogVisitRepository {
    async getMoreVisitedPlaces(){
        const result = await LogVisitModel.findAll({
            attributes: ['idPlaceFk', [sequelize.fn('COUNT', sequelize.col('idPlaceFk')), 'visitCount']],
            group: ['idPlaceFk'],
            order: [[sequelize.fn('COUNT', sequelize.col('idPlaceFk')), 'DESC']],
            limit: 4
        });
        return result.map(logVisit => logVisit.toJSON());
    }
}
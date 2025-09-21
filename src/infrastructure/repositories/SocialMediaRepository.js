import ISocialMediaRepository from "../../domain/repositories/ISocialMediaRepository.js";
import { Op } from 'sequelize';

export default class SocialMediaRepository extends ISocialMediaRepository {
    constructor(socialMediaModel) {
        super();
        this.socialMediaModel = socialMediaModel;
    }
    async getSocialMediaByName(socialMediaName) {
        const result = await this.socialMediaModel.findOne({
            where: {
                socialMediaName: {
                    [Op.iLike]: `%${socialMediaName}%`
                }
            }
        });
        return result ? result.toJSON() : null;
    }
    async getSocialMediaByNames(names) {
        const result = await this.socialMediaModel.findAll({
            where: {
                name: {
                    [Op.in]: names
                }
            }
        });
        return result.map(socialMedia => socialMedia.toJSON());
    }
}
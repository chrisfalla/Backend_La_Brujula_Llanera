import ISocialMediaRepository from "../../domain/repositories/ISocialMediaRepository";
import { Op } from 'sequelize';

export default class SocialMediaRepository extends ISocialMediaRepository {
    constructor(socialMediaModel) {
        super();
        this.socialMediaModel = socialMediaModel;
    }
    async getSocialMediaByName(name) {
        const result = await this.socialMediaModel.findOne({
            where: {
                name: {
                    [Op.iLike]: `%${name}%`
                }
            }
        });
        return result ? result.toJSON() : null;
    }
}
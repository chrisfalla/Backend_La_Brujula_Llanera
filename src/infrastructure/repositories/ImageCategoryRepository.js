import { IImageCategoryRepository } from '../../domain/repositories/IImageCategoryRepository.js';
import { ImageCategoryModel } from '../models/ImageCategoryModel.js';

export class ImageCategoryRepository extends IImageCategoryRepository {
    async getImageCategoryByName(name) {
        const result = await ImageCategoryModel.findOne({
            where: { name },
            attributes: ['idImageCategory', 'name']
        });

        return result ? result.toJSON() : null;
    }
}

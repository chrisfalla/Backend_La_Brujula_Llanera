import IImageCategoryRepository from '../../domain/repositories/IImageCategoryRepository.js';

export default class ImageCategoryRepository extends IImageCategoryRepository {
    constructor(imageCategoryModel) {
        super();
        this.imageCategoryModel = imageCategoryModel;
    }
    async getImageCategoryByName(name) {
        const result = await this.imageCategoryModel.findOne({
            where: { name },
            attributes: ['idImageCategory', 'name']
        });

        return result ? result.toJSON() : null;
    }
}

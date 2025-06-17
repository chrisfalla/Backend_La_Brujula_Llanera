export default class AddPlaceUseCase {
    constructor(placeRepository, categoryRepository){
        this.placeRepository = placeRepository;
        this.categoryRepository = categoryRepository;
    }
    async addPlaceUC(name, description, nameCategory){
        const category = await this.categoryRepository.getByName(nameCategory);
        if (!category) {
            throw new Error(`Category with name ${nameCategory} not found`);
        }
        const place = await this.placeRepository.addPlace(name, description, category.idCategory);
        return place;
    }

}
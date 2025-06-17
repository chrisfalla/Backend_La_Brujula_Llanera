export default class PostTagByPlaceUseCase {
    constructor(tagRepository, tagByPlaceRepository) {
      this.tagRepository = tagRepository;
        this.tagByPlaceRepository = tagByPlaceRepository;
    }
  
    async AddTagsByPlace(placeId, tagNames) {
      const tags = await this.tagRepository.getTagsByNames(tagNames);
      const tagsAlredyTaken = await this.tagByPlaceRepository.getTagsByPlaceId(placeId); 
      const takenTagIds = tagsAlredyTaken.map(tag => tag.idTag);
      const newTags = tags.filter(tag => !takenTagIds.includes(tag.idTag));
      if (newTags.length > 0) {
        const newTagIds = newTags.map(tag => tag.idTag);
        await this.tagByPlaceRepository.addTagsByPlace(placeId, newTagIds);
        return { message: 'Tags added successfully', addedTags: newTags };
      } else {
        return { message: 'No new tags were added', addedTags: [] };
      }
    }
  }
  
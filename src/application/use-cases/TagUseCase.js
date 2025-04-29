import TagDTO from "../DTOs/TagDTO.js";

export default class TagUseCase {
  constructor(tagRepository) {
    this.tagRepository = tagRepository;
  }
  async getAllTags() {
    const tags = await this.tagRepository.getAll();
    return tags.map(tag => new TagDTO(tag.idTag, tag.name, tag.isDefault));
  }

  async getTagById(id) {
    const tag = await this.tagRepository.getById(id);
    return new TagDTO(tag.idTag, tag.name, tag.isDefault);
  }

  async getTagByName(name) {
    const tagByName = await this.tagRepository.getByName(name);
    return tagByName.map(tag => new TagDTO(tag.idTag, tag.name, tag.isDefault));
  }

  async getDefaultTags() {
    const defaultTags = await this.tagRepository.getDefault();
    return defaultTags.map(tag => new TagDTO(tag.idTag, tag.name, tag.isDefault));
  }

  async createTag(name) {
    const newCategory = { name };
    return await this.tagRepository.create(newCategory);
  }

  async updateTag(id, name) {
    const updatedCategory = { name };
    return await this.tagRepository.update(id, updatedCategory);
  }

  async deleteTag(id) {
    return await this.tagRepository.delete(id);
  }
}

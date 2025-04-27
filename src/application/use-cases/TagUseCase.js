import { TagRepository } from "../../infrastructure/repositories/TagRepository.js";
import { TagDTO } from "../DTOs/TagDTO.js";

export class TagUseCase {
  static async getAllTags() {
    const tagRepository = new TagRepository();
    const tags = await tagRepository.getAll();
    return tags.map(tag => new TagDTO(tag.idTag, tag.name, tag.isDefault));
  }

  static async getTagById(id) {
    const tagRepository = new TagRepository();
    const tag = await tagRepository.getById(id);
    return new TagDTO(tag.idTag, tag.name, tag.isDefault);
  }

  static async getTagByName(name) {
    const tagRepository = new TagRepository();
    const tagByName = await tagRepository.getByName(name);
    return tagByName.map(tag => new TagDTO(tag.idTag, tag.name, tag.isDefault));
  }

  static async getDefaultTags() {
    const tagRepository = new TagRepository();
    const defaultTags = await tagRepository.getDefault();
    return defaultTags.map(tag => new TagDTO(tag.idTag, tag.name, tag.isDefault));
  }

  static async createTag(name) {
    const tagRepository = new TagRepository();
    const newCategory = { name };
    return await tagRepository.create(newCategory);
  }

  static async updateTag(id, name) {
    const tagRepository = new TagRepository();
    const updatedCategory = { name };
    return await tagRepository.update(id, updatedCategory);
  }

  static async deleteTag(id) {
    const tagRepository = new TagRepository();
    return await tagRepository.delete(id);
  }
}

import { TagRepository } from "../../infrastructure/repositories/TagRepository.js";

export class TagUseCase {
  static async getAllTags() {
    const tagRepository = new TagRepository();
    return await tagRepository.getAll();
  }

  static async getTagById(id) {
    const tagRepository = new TagRepository();
    return await tagRepository.getById(id);
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
  static async getTagByName(name) {
    const tagRepository = new TagRepository();
    return await tagRepository.getByName(name);
  }
  static async getDefaultTags() {
    const tagRepository = new TagRepository();
    return await tagRepository.getDefault();
  }
}

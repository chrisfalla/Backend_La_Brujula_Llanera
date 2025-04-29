import { TagUseCase } from '../../application/use-cases/TagUseCase.js';

export class TagController {
  static async getAllTags(req, res) {
    try {
      const tags = await TagUseCase.getAllTags();
      res.status(200).json(tags);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error while getting Tags' });
    }
  }

  static async getTagById(req, res) {
    try {
      const { id } = req.params;
      const tag = await TagUseCase.getTagById(id);
      if (!tag) {
        return res.status(404).json({ message: 'Category not found.' });
      }
      res.status(200).json(tag);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error while getting the Tag.' });
    }
  }

  static async createTag(req, res) {
    try {
      const { name } = req.body;
      const tag = await TagUseCase.createTag(name);
      res.status(201).json(tag);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error while creating tag.' });
    }
  }

  static async updateTag(req, res) {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const updated = await TagUseCase.updateTag(id, name);
      if (!updated) {
        return res.status(404).json({ message: 'Tag not found' });
      }
      res.status(200).json({ message: 'Tag updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error while updating the Tag.' });
    }
  }

  static async deleteTag(req, res) {
    try {
      const { id } = req.params;
      const deleted = await TagUseCase.deleteTag(id);
      if (!deleted) {
        return res.status(404).json({ message: 'Tag not found' });
      }
      res.status(200).json({ message: 'Tag Removed successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error while Removing the Tag' });
    }
  }
  static async getDefaultTags(req, res) {
    try {
      const tags = await TagUseCase.getDefaultTags();
      res.status(200).json(tags);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error while getting Tags' });
    }
  }
}

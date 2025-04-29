export default class TagController {
  constructor(tagUseCase){
    this.tagUseCase = tagUseCase;
  }
  async getAllTags(req, res) {
    try {
      const tags = await this.tagUseCase.getAllTags();
      res.status(200).json(tags);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error while getting Tags' });
    }
  }

  async getTagById(req, res) {
    try {
      const { id } = req.params;
      const tag = await this.tagUseCase.getTagById(id);
      if (!tag) {
        return res.status(404).json({ message: 'Category not found.' });
      }
      res.status(200).json(tag);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error while getting the Tag.' });
    }
  }

  async createTag(req, res) {
    try {
      const { name } = req.body;
      const tag = await this.tagUseCase.createTag(name);
      res.status(201).json(tag);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error while creating tag.' });
    }
  }

  async updateTag(req, res) {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const updated = await this.tagUseCase.updateTag(id, name);
      if (!updated) {
        return res.status(404).json({ message: 'Tag not found' });
      }
      res.status(200).json({ message: 'Tag updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error while updating the Tag.' });
    }
  }

  async deleteTag(req, res) {
    try {
      const { id } = req.params;
      const deleted = await this.tagUseCase.deleteTag(id);
      if (!deleted) {
        return res.status(404).json({ message: 'Tag not found' });
      }
      res.status(200).json({ message: 'Tag Removed successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error while Removing the Tag' });
    }
  }
  async getDefaultTags(req, res) {
    try {
      const tags = await this.tagUseCase.getDefaultTags();
      res.status(200).json(tags);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error while getting Tags' });
    }
  }
}

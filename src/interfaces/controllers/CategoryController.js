export default class CategoryController {
  constructor(categoryUseCase) {
    this.categoryUseCase = categoryUseCase;
  }

  async getAllCategories(req, res) {
    try {
      const categories = await this.categoryUseCase.getAllCategories();
      res.status(200).json(categories);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error while getting the Categories.' });
    }
  }

  async getCategoryById(req, res) {
    try {
      const { id } = req.params;
      const category = await this.categoryUseCase.getCategoryById(id);
      if (!category) {
        return res.status(404).json({ message: 'Category not found.' });
      }
      res.status(200).json(category);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error while getting the Category.' });
      console.log("entra aqui");
    }
  }

  async createCategory(req, res) {
    try {
      const { name, isActive, isDefault } = req.body;
      const category = await this.categoryUseCase.createCategory(name, isActive, isDefault);
      res.status(201).json(category);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error while creating the Category.' });
    }
  }

  async updateCategory(req, res) {
    try {
      const { id } = req.params;
      const { name, isActive, isDefault } = req.body;
      const updated = await this.categoryUseCase.updateCategory(id, name, isActive, isDefault);
      if (!updated) {
        return res.status(404).json({ message: 'Category not found.' });
      }
      res.status(200).json({ message: 'Category upated successfully.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error while updating the Category.' });
    }
  }

  async deleteCategory(req, res) {
    try {
      const { id } = req.params;
      const deleted = await this.categoryUseCase.deleteCategory(id);
      if (!deleted) {
        return res.status(404).json({ message: 'Category not found' });
      }
      res.status(200).json({ message: 'Category updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error while removing the Category' });
    }
  }

  async getDefaultCategory(req, res){
    try {
      const category = await this.categoryUseCase.getDefaultCategory();
      if (!category) {
        return res.status(404).json({ message: 'Category not found.' });
      }
      res.status(200).json(category);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error while getting the Category.' });
    }
  }

}

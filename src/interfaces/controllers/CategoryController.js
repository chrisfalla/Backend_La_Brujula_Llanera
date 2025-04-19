import { CategoryUseCase } from '../../application/use-cases/CategoryUseCase.js'; 

export class CategoryController {
  static async getAllCategories(req, res) {
    try {
      const categories = await CategoryUseCase.getAllCategories();
      res.status(200).json(categories);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error while getting the Categories.' });
    }
  }

  static async getCategoryById(req, res) {
    try {
      const { id } = req.params;
      const category = await CategoryUseCase.getCategoryById(id);
      if (!category) {
        return res.status(404).json({ message: 'Category not found.' });
      }
      res.status(200).json(category);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error while getting the Category.' });
    }
  }

  static async createCategory(req, res) {
    try {
      const { name, isActive } = req.body;
      const category = await CategoryUseCase.createCategory(name, isActive);
      res.status(201).json(category);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error while creating the Category.' });
    }
  }

  static async updateCategory(req, res) {
    try {
      const { id } = req.params;
      const { name, isActive } = req.body;
      const updated = await CategoryUseCase.updateCategory(id, name, isActive);
      if (!updated) {
        return res.status(404).json({ message: 'Category not found.' });
      }
      res.status(200).json({ message: 'Category upated successfully.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error while updating the Category.' });
    }
  }

  static async deleteCategory(req, res) {
    try {
      const { id } = req.params;
      const deleted = await CategoryUseCase.deleteCategory(id);
      if (!deleted) {
        return res.status(404).json({ message: 'Category not found' });
      }
      res.status(200).json({ message: 'Category updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error while removing the Category' });
    }
  }
}

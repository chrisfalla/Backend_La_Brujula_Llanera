import { CategoryUseCase } from '../../application/use-cases/CategoryUseCase.js'; 

export class CategoryController {
  static async getAllCategories(req, res) {
    try {
      const categories = await CategoryUseCase.getAllCategories();
      res.status(200).json(categories);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener las categorías.' });
    }
  }

  static async getCategoryById(req, res) {
    try {
      const { id } = req.params;
      const category = await CategoryUseCase.getCategoryById(id);
      if (!category) {
        return res.status(404).json({ message: 'Categoría no encontrada.' });
      }
      res.status(200).json(category);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener la categoría.' });
    }
  }

  static async createCategory(req, res) {
    try {
      const { name, isActive } = req.body;
      const category = await CategoryUseCase.createCategory(name, isActive);
      res.status(201).json(category);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al crear la categoría.' });
    }
  }

  static async updateCategory(req, res) {
    try {
      const { id } = req.params;
      const { name, isActive } = req.body;
      const updated = await CategoryUseCase.updateCategory(id, name, isActive);
      if (!updated) {
        return res.status(404).json({ message: 'Categoría no encontrada.' });
      }
      res.status(200).json({ message: 'Categoría actualizada con éxito.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al actualizar la categoría.' });
    }
  }

  static async deleteCategory(req, res) {
    try {
      const { id } = req.params;
      const deleted = await CategoryUseCase.deleteCategory(id);
      if (!deleted) {
        return res.status(404).json({ message: 'Categoría no encontrada.' });
      }
      res.status(200).json({ message: 'Categoría eliminada con éxito.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al eliminar la categoría.' });
    }
  }
}

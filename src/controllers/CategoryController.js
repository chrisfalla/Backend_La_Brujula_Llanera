import { findCategoryByName } from '../services/CategoryService.js';

export const searchCategory = async (req, res) => {
  const { name } = req.query;

  if (!name) {
    return res.status(400).json({ error: 'Category name is required' });
  }

  try {
    const category = await findCategoryByName(name);

    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    res.json(category);
  } catch (error) {
    console.error('Error searching category:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

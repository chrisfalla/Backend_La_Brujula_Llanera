export class Category {
    constructor({ idCategory, name, isActive, createdAt, updatedAt, isDefault, icon }) {
      this.idCategory = idCategory;
      this.name = name;
      this.isActive = isActive;
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
      this.isDefault = isDefault;
      this.icon = icon;
    }
  }
  
export default class Tag {
    constructor({ idTag, name, createdAt, updatedAt, isDefault }) {
      this.idTag = idTag;
      this.name = name;
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
      this.isDefault = isDefault;
    }
  }
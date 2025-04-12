export default (sequelize, DataTypes) => {
  const Categorie = sequelize.define('Categorie', {
    id_Categoria: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'nombre_categoria',
    },
  }, {
    tableName: 'Categorias',
    timestamps: true, // Cambiado a true para manejar createdAt y updatedAt
  });

  return Categorie;
};

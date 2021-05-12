module.exports = (sequelize, DataTypes) => {
  const foto = sequelize.define(
    "Foto",
    {
      imagem: {
        type: DataTypes.STRING(54),
      },
      id_publicacao: {
        type: DataTypes.INTEGER,
        unique: true,
      },
    },
    {
      tableName: "foto",
      timestamps: false,
    }
  );

  foto.associate = (models) => {
    foto.belongsTo(models.Publicacao, {
      foreignKey: "id_publicacao",
    });
  };

  return foto;
};

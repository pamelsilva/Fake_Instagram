module.exports = (sequelize, DataTypes) => {
  const usuario = sequelize.define(
    "Usuario",
    {
      nome: DataTypes.STRING,
      email: DataTypes.STRING,
      imagem: DataTypes.STRING,
      senha: DataTypes.STRING,
      username: {
        type: DataTypes.STRING,
        unique: true,
      },
      username: DataTypes.STRING,
      data_nasc: DataTypes.DATE,
    },
    {
      tableName: "usuario",
      timestamps: false,
    }
  );

  usuario.associate = (models) => {
    usuario.hasMany(models.Publicacao, {
      foreignKey: "usuario_id",
    });
  };

  return usuario;
};

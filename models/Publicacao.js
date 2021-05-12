module.exports = (sequelize, DataTypes) => {
  const publicacao = sequelize.define(
    "Publicacao",
    {
      legenda: {
        type: DataTypes.STRING(54),
      },
      created_at: {
        type: DataTypes.DATE,
      },
      usuario_id: {
        type: DataTypes.INTEGER,
        unique: true,
      },
    },
    {
      tableName: "publicacao",
      timestamps: false,
    }
  );

  publicacao.associate = (models) => {
    publicacao.hasMany(models.Foto, {
      foreignKey: "id_publicacao",
    });

    publicacao.belongsTo(models.Usuario, {
      foreignKey: "usuario_id",
    });
  };

  return publicacao;
};

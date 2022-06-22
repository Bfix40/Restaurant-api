const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('menu', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false
    },
    menu_type: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'menu_types',
        key: 'id'
      }
    },
    parent_menu_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'menu',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "menu_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};

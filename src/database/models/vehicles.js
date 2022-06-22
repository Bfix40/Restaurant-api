const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('vehicles', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    registration_plate: {
      type: DataTypes.STRING,
      allowNull: false
    },
    licence_number: {
      type: DataTypes.STRING,
      allowNull: true
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: true
    },
    model: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'vehicles',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "vehicles_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};

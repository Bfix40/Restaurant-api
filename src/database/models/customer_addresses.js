const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('customer_addresses', {
    uuid: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    line_1: {
      type: DataTypes.STRING,
      allowNull: false
    },
    line_2: {
      type: DataTypes.STRING,
      allowNull: true
    },
    line_3: {
      type: DataTypes.STRING,
      allowNull: true
    },
    line_4: {
      type: DataTypes.STRING,
      allowNull: true
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    zip_postcode: {
      type: DataTypes.STRING,
      allowNull: false
    },
    state_province: {
      type: DataTypes.STRING,
      allowNull: false
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false
    },
    longitude: {
      type: DataTypes.REAL,
      allowNull: true
    },
    latitude: {
      type: DataTypes.REAL,
      allowNull: true
    },
    other_details: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    user_uuid: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'uuid'
      }
    }
  }, {
    sequelize,
    tableName: 'customer_addresses',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "customer_addresses_pkey",
        unique: true,
        fields: [
          { name: "uuid" },
        ]
      },
    ]
  });
};

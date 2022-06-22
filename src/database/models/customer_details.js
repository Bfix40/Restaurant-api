const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('customer_details', {
    uuid: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    user_uuid: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'users',
        key: 'uuid'
      }
    },
    st_customer_id: {
      type: DataTypes.UUID,
      allowNull: true
    },
    st_default_payment_method_id: {
      type: DataTypes.STRING,
      allowNull: true
    },
    default_address_uuid: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'customer_addresses',
        key: 'uuid'
      }
    }
  }, {
    sequelize,
    tableName: 'customer_details',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "customer_details_pkey",
        unique: true,
        fields: [
          { name: "uuid" },
        ]
      },
    ]
  });
};

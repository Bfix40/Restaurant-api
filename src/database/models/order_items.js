const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('order_items', {
    order_uuid: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'orders',
        key: 'uuid'
      }
    },
    menu_item_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'menu_items',
        key: 'id'
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1
    },
    unit_price: {
      type: DataTypes.DECIMAL,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'order_items',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "order_items_pkey",
        unique: true,
        fields: [
          { name: "order_uuid" },
          { name: "menu_item_id" },
        ]
      },
    ]
  });
};

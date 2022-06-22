const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('orders', {
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
    st_order_id: {
      type: DataTypes.STRING,
      allowNull: true
    },
    st_customer_id: {
      type: DataTypes.STRING,
      allowNull: true
    },
    st_customer_payment_method_id: {
      type: DataTypes.STRING,
      allowNull: true
    },
    status_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'order_statuses',
        key: 'id'
      }
    },
    sub_total: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    discount: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    tax: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    shipping: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    promo_code: {
      type: DataTypes.STRING,
      allowNull: true
    },
    total: {
      type: DataTypes.DECIMAL,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'orders',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "orders_pkey",
        unique: true,
        fields: [
          { name: "uuid" },
        ]
      },
    ]
  });
};

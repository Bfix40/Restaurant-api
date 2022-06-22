const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('payments', {
    uuid: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    user_uuid: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'uuid'
      }
    },
    order_uuid: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'orders',
        key: 'uuid'
      }
    },
    st_customer_id: {
      type: DataTypes.STRING,
      allowNull: true
    },
    st_payment_method: {
      type: DataTypes.STRING,
      allowNull: true
    },
    payment_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    amount: {
      type: DataTypes.DECIMAL,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'payments',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "payments_pkey",
        unique: true,
        fields: [
          { name: "uuid" },
        ]
      },
    ]
  });
};

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('deliveries', {
    uuid: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    order_uuid: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'orders',
        key: 'uuid'
      }
    },
    delivery_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    vehicle_uuid: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'vehicles',
        key: 'id'
      }
    },
    delivery_stage_code: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'delivery_stage_codes',
        key: 'id'
      }
    },
    delivery_address_uuid: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'customer_addresses',
        key: 'uuid'
      }
    },
    driver_employee_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'employees',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'deliveries',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "deliveries_pkey",
        unique: true,
        fields: [
          { name: "uuid" },
        ]
      },
    ]
  });
};

var DataTypes = require("sequelize").DataTypes;
var _customer_addresses = require("./customer_addresses");
var _customer_details = require("./customer_details");
var _deliveries = require("./deliveries");
var _delivery_stage_codes = require("./delivery_stage_codes");
var _employees = require("./employees");
var _menu = require("./menu");
var _menu_items = require("./menu_items");
var _menu_types = require("./menu_types");
var _order_items = require("./order_items");
var _order_statuses = require("./order_statuses");
var _orders = require("./orders");
var _payments = require("./payments");
var _roles = require("./roles");
var _users = require("./users");
var _vehicles = require("./vehicles");

const Sequelize = require('sequelize');
require('dotenv').config()
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config');

const configObj = config[env]

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[configObj.use_env_variable], configObj);
} else {
  sequelize = new Sequelize(configObj.database, configObj.username, configObj.password, configObj);
}



function initModels() {
  var customer_addresses = _customer_addresses(sequelize, DataTypes);
  var customer_details = _customer_details(sequelize, DataTypes);
  var deliveries = _deliveries(sequelize, DataTypes);
  var delivery_stage_codes = _delivery_stage_codes(sequelize, DataTypes);
  var employees = _employees(sequelize, DataTypes);
  var menu = _menu(sequelize, DataTypes);
  var menu_items = _menu_items(sequelize, DataTypes);
  var menu_types = _menu_types(sequelize, DataTypes);
  var order_items = _order_items(sequelize, DataTypes);
  var order_statuses = _order_statuses(sequelize, DataTypes);
  var orders = _orders(sequelize, DataTypes);
  var payments = _payments(sequelize, DataTypes);
  var roles = _roles(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);
  var vehicles = _vehicles(sequelize, DataTypes);

  menu_items.belongsToMany(orders, { as: 'order_uuid_orders', through: order_items, foreignKey: "menu_item_id", otherKey: "order_uuid" });
  orders.belongsToMany(menu_items, { as: 'menu_item_id_menu_items', through: order_items, foreignKey: "order_uuid", otherKey: "menu_item_id" });
  customer_details.belongsTo(customer_addresses, { as: "default_address_uu", foreignKey: "default_address_uuid"});
  customer_addresses.hasMany(customer_details, { as: "customer_details", foreignKey: "default_address_uuid"});
  deliveries.belongsTo(customer_addresses, { as: "delivery_address_uu", foreignKey: "delivery_address_uuid"});
  customer_addresses.hasMany(deliveries, { as: "deliveries", foreignKey: "delivery_address_uuid"});
  deliveries.belongsTo(delivery_stage_codes, { as: "delivery_stage_code_delivery_stage_code", foreignKey: "delivery_stage_code"});
  delivery_stage_codes.hasMany(deliveries, { as: "deliveries", foreignKey: "delivery_stage_code"});
  deliveries.belongsTo(employees, { as: "driver_employee", foreignKey: "driver_employee_id"});
  employees.hasMany(deliveries, { as: "deliveries", foreignKey: "driver_employee_id"});
  menu_items.belongsTo(menu, { as: "menu", foreignKey: "menu_id"});
  menu.hasMany(menu_items, { as: "menu_items", foreignKey: "menu_id"});
  order_items.belongsTo(menu_items, { as: "menu_item", foreignKey: "menu_item_id"});
  menu_items.hasMany(order_items, { as: "order_items", foreignKey: "menu_item_id"});
  menu.belongsTo(menu_types, { as: "menu_type_menu_type", foreignKey: "menu_type"});
  menu_types.hasMany(menu, { as: "menus", foreignKey: "menu_type"});
  orders.belongsTo(order_statuses, { as: "status", foreignKey: "status_id"});
  order_statuses.hasMany(orders, { as: "orders", foreignKey: "status_id"});
  deliveries.belongsTo(orders, { as: "order_uu", foreignKey: "order_uuid"});
  orders.hasMany(deliveries, { as: "deliveries", foreignKey: "order_uuid"});
  order_items.belongsTo(orders, { as: "order_uu", foreignKey: "order_uuid"});
  orders.hasMany(order_items, { as: "order_items", foreignKey: "order_uuid"});
  payments.belongsTo(orders, { as: "order_uu", foreignKey: "order_uuid"});
  orders.hasMany(payments, { as: "payments", foreignKey: "order_uuid"});
  users.belongsTo(roles, { as: "role", foreignKey: "role_id"});
  roles.hasMany(users, { as: "users", foreignKey: "role_id"});
  customer_addresses.belongsTo(users, { as: "user_uu", foreignKey: "user_uuid"});
  users.hasMany(customer_addresses, { as: "customer_addresses", foreignKey: "user_uuid"});
  customer_details.belongsTo(users, { as: "user_uu", foreignKey: "user_uuid"});
  users.hasMany(customer_details, { as: "customer_details", foreignKey: "user_uuid"});
  employees.belongsTo(users, { as: "user_uu", foreignKey: "user_uuid"});
  users.hasMany(employees, { as: "employees", foreignKey: "user_uuid"});
  orders.belongsTo(users, { as: "user_uu", foreignKey: "user_uuid"});
  users.hasMany(orders, { as: "orders", foreignKey: "user_uuid"});
  payments.belongsTo(users, { as: "user_uu", foreignKey: "user_uuid"});
  users.hasMany(payments, { as: "payments", foreignKey: "user_uuid"});
  deliveries.belongsTo(vehicles, { as: "vehicle_uu", foreignKey: "vehicle_uuid"});
  vehicles.hasMany(deliveries, { as: "deliveries", foreignKey: "vehicle_uuid"});

  return {
    customer_addresses,
    customer_details,
    deliveries,
    delivery_stage_codes,
    employees,
    menu,
    menu_items,
    menu_types,
    order_items,
    order_statuses,
    orders,
    payments,
    roles,
    users,
    vehicles,
  };
}

module.exports.initModels = initModels;
module.exports.sequelize = sequelize
const Sequelize = require("sequelize");

const DB_PASSWORD = process.env.DB_PASSWORD;

const sequelize = new Sequelize("todos", "root", DB_PASSWORD, {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;

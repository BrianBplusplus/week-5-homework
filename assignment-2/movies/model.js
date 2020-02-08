const Sequelize = require("sequelize");
const db = require("../db");

const Movie = db.define("Movie", {
  title: Sequelize.STRING,
  yearOfRelease: Sequelize.INTEGER,
  synopsis: Sequelize.STRING
});

module.exports = Movie;

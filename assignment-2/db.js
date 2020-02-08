const Sequelize = require("sequelize");
const Movie = require("./movies/model");

const databaseUrl =
  process.env.DATABASE_URL ||
  "postgres://postgres:secret@localhost:5432/postgres";
const db = new Sequelize(databaseUrl);

db.sync()
  .then(() =>
    Promise.all([
      Movie.create({ title: "Watchmen", yearOfRelease: 2009, synopsis: "---" }),
      Movie.create({
        title: "Starship Troopers",
        yearOfRelease: 1998,
        synopsis: "---"
      }),
      Movie.create({ title: "Alien", yearOfRelease: 1979, synopsis: "---" })
    ])
  )
  .then(() => console.log("Database updated"))
  .catch(console.error);

module.exports = db;

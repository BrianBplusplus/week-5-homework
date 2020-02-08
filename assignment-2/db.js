const Sequelize = require("sequelize");

const databaseUrl =
  process.env.DATABASE_URL ||
  "postgres://postgres:secret@localhost:5432/postgres";
const db = new Sequelize(databaseUrl);

const InitialMovies = db.define("Movie", {
  title: Sequelize.STRING,
  yearOfRelease: Sequelize.INTEGER,
  synopsis: Sequelize.STRING
});

//db.sync({ force: true })
db.sync()
  .then(() => {
    // This if statement doesnt work. tried to prevent multiple entries if they exist but couldn't make it work
    if (InitialMovies.length === 0) {
      Promise.all([
        InitialMovies.create({
          title: "Watchmen",
          yearOfRelease: 2009,
          synopsis:
            "Rorschach, a vigilante, sets out to investigate the mysterious circumstances under which one of his colleagues died. In the process of doing so, he discovers some disturbing secrets."
        }),
        InitialMovies.create({
          title: "Starship Troopers",
          yearOfRelease: 1998,
          synopsis:
            "Johnny Rico completes his graduation and joins the Mobile Infantry to serve the nation. Soon, he finds himself fighting against alien bugs that are hell-bent on destroying life on Earth."
        }),
        InitialMovies.create({
          title: "Alien",
          yearOfRelease: 1979,
          synopsis:
            "The crew of a spacecraft, Nostromo, intercept a distress signal from a planet and set out to investigate it. However, to their horror, they are attacked by an alien which later invades their ship."
        })
      ]);
    }
  })
  .then(() => InitialMovies.findAll())
  .then(() => console.log("Database updated"))
  .catch(console.error);

module.exports = db;

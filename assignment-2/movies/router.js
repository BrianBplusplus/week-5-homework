const { Router } = require("express");
const Movie = require("./model");

const router = new Router();

//CRUD CREATE
router.post("/movies", (request, response, next) => {
  const { title, yearOfRelease, synopsis } = request.body;
  Movie.create({
    title: title,
    yearOfRelease: yearOfRelease,
    synopsis: synopsis
  })
    .then(movie => {
      response.json(movie);
    })
    .catch(error => next(error));
});

module.exports = router;

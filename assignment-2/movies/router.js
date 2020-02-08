const { Router } = require("express");
const Movie = require("./model");

const router = new Router();

//CRUD CREATE
router.post("/movies", (request, response, next) => {
  console.log("adding new movie entry");
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

//CRUD READ
router.get("/movies", (request, response, next) => {
  console.log("/movies request received => displaying all entries");
  Movie.findAll()
    .then(movie => response.json(movie))
    .catch(error => next(error));
});

router.get("/movies/:id", (request, response, next) => {
  console.log("/movies request received => displaying single entry");
  Movie.findByPk(request.params.id)
    .then(movie => response.json(movie))
    .catch(error => next(error));
});

//CRUD UPDATE
router.put("/movies/:id", (request, response, next) =>
  Movie.findByPk(request.params.id)
    .then(movie => movie.update(request.body))
    .then(movie => response.send(movie))
    .catch(error => next(error))
);

//CRUD DELETE
router.delete("/movies/:id", (request, response, next) =>
  Movie.destroy({ where: { id: request.params.id } })
    .then(movie => response.send({ movie }))
    .catch(next)
);

module.exports = router;

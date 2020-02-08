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
  const limit = Math.min(request.query.limit || 10, 500);
  const offset = request.query.offset || 0;
  console.log("/movies request received => displaying all entries");
  Movie.findAndCountAll({
    limit,
    offset
  })
    .then(result => response.send({ data: result.rows, total: result.count }))
    .catch(error => next(error));
});

router.get("/movies/:id", (request, response, next) => {
  console.log("/movies request received => displaying single entry");
  Movie.findByPk(request.params.id)
    .then(movie => {
      if (!movie) {
        response.status(404).end();
      } else {
        response.json(movie);
      }
    })
    .catch(error => next(error));
});

//CRUD UPDATE
router.put("/movies/:id", (request, response, next) => {
  Movie.findByPk(request.params.id)
    .then(movie => {
      if (movie) {
        movie.update(request.body).then(movie => response.json(movie));
      } else {
        response.status(404).end();
      }
    })
    .catch(error => next(error));
});

//CRUD DELETE
router.delete("/movies/:id/", (request, response, next) => {
  Movie.destroy({
    where: {
      id: request.params.id
    }
  })
    .then(movieDeleted => {
      if (movieDeleted) {
        console.log("Selected movie deleted");
        response.status(204).end();
      } else {
        console.log("Selected movie not found");
        response.status(404).end();
      }
    })
    .catch(error => next(error));
});

module.exports = router;

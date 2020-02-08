const express = require("express");
const bodyParser = require("body-parser");
const moviesRouter = require("./movies/router");

const port = 3000;
const app = express();

const jsonParser = bodyParser.json();
app.use(jsonParser);

app.use(moviesRouter);

app.get("/test", (request, response) => {
  console.log("Hello world");
});

app.listen(port, () => console.log(`Listening on ${port}`));

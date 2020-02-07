const express = require("express");
const bodyParser = require("body-parser");

const port = 3000;
const app = express();
let requestLimit = 0;

const jsonParser = bodyParser.json();
app.use(jsonParser);

const requestLimitMiddleware = (request, response, next) => {
  if (requestLimit >= 5) {
    response.status(429).end();
  } else {
    requestLimit += 1;
    next();
  }
};

app.use(requestLimitMiddleware);

app.post("/messages", (request, response) => {
  console.log(request.body.text);
  if (request.body.text !== undefined && request.body.text !== "") {
    response.json({
      message: "This is the message that was sent"
    });
  } else {
    response.status(400).end();
  }
});

app.listen(port, () => console.log(`Listening on ${port}`));

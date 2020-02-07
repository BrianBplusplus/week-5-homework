const express = require("express");
const bodyParser = require("body-parser");

const port = 3000;
const app = express();

const jsonParser = bodyParser.json();
app.use(jsonParser);

app.post("/messages", (request, response, next) => {
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

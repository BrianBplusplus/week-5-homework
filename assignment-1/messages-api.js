const express = require("express");
const bodyParser = require("body-parser");

const port = 3000;
const app = express();

const jsonParser = bodyParser.json();
app.use(jsonParser);

app.post("/messages", (request, response, next) => {
  console.log(request.body);
  response.json({
    message: "This is the message that was sent"
  });
});

app.listen(port, () => console.log(`Listening on ${port}`));

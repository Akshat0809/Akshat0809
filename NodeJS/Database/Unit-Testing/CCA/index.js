// console.log("Main Index.js")
const express = require("express");
const app = express();
const router = require("./rest-service");
require("./handelers/kafka")
const port = 8086;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", router);

app.listen(port, (err) => {
  console.log(`App listening at http://localhost:${port}/users`);
});

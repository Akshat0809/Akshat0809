// console.log("Main Index.js")
const express = require("express");
const app = express();
const router = require("./rest-service");
require("./handelers/kafka")
const port = 8000;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", router);

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('emailclient', 'akshatj', 'akshatj', {
  dialect: 'postgres',
  host: 'localhost',
  port: 26257,
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false
    }
  }
});
const { Umzug, SequelizeStorage } = require('umzug');

const umzug = new Umzug({
  migrations: { glob: './migrations/*.js' },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize }),
  logger: console,
});

(async () => {
  await umzug.up();
})();

app.listen(port, (err) => {
  console.log(`App listening at http://localhost:${port}/users`);
});

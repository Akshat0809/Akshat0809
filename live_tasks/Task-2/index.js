console.log("Main Index.js")
const express = require("express");
const app = express();
const router = require("./rest-services");
const port = 8080;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/", router);
const fs = require('fs');


const { Sequelize } = require('sequelize');
const { Umzug, SequelizeStorage } = require('umzug');
const sequelize = new Sequelize(
  "products",
  "Akshat08",
  "Binny08@",
  { dialect: 'mysql' });

const umzug = new Umzug({
  migrations: { glob: './migrations/*.js' },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize }),
  logger: console,
});

umzug.up().then(() => {
  console.log("All migration are updated");
})
  .catch((err) => {
    console.log(`Err ${err}`);
  });

app.get('/download-csv', (req, res) => {
  fs.readFile('/home/ad.rapidops.com/akshat.jain/Akshat-Jain/live_tasks/Task-2/data.csv', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to read CSV file' });
    }
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="file.csv"');
    res.send(data);
  });
});

// (async () => {
//   await umzug.down({to:0});
// })();

app.listen(port, (err) => {
  console.log(`App listening at http://localhost:${port}/products`);
});

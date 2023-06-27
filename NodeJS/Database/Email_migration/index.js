const { Sequelize } = require('sequelize');
const { Umzug, SequelizeStorage } = require('umzug');
const sequelize = new Sequelize(
  "Migartion2",
  "Akshat08",
  "Binny08@",{ dialect: 'mysql'});
  const umzug = new Umzug({ migrations: { glob: './migrations/*.js' },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize }),
  logger: console,});
  
  // (async () => {//   await umzug.up();// })();
  umzug.up().then(()=>{
    console.log("All migration are updated");}).catch((err) => { console.log(`Err ${err}`);});
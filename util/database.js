const dbConfig = require('../config/db.config.js');

const {Sequelize, DataTypes} = require('sequelize');

const sequelize = new Sequelize(
  dbConfig.DB,
  dbConfig.USER,
  dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,

    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle
    }
  }
);

sequelize.authenticate()
.then(() => {
  console.log('connected to db')
})
.catch(err => {
  console.log('Error' + err)
});


const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;


db.users = require('../models/user.js')(sequelize,DataTypes);



// everytime we run the server on this api, we might lose all our data so we write force: false
// also if tables doensot exist it will create it. but if exist, it won't recreate it (which is the case for force: true)
db.sequelize.sync({force: false})
.then(() => {
    console.log('Resync is done')
});


module.exports = db;

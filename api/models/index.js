const dbConfig = require('../database/database')
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
  dbConfig.DB,
  dbConfig.USER,
  dbConfig.PASSWORD,
  {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,

    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle,
    },
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('./userModel')(sequelize, Sequelize);
db.addressBook= require('./addressBookModel')(sequelize, Sequelize);
db.category=require('./categoryModel')(sequelize, Sequelize);
db.testimonial=require('./testimonialModel')(sequelize, Sequelize);
db.contactUs=require('./contactUsModel')(sequelize, Sequelize);
db.Port=require('./portModel')(sequelize, Sequelize);
db.sequelize.sync()
  .then(() => {
    console.log('Database synchronized.');
  })
  .catch((err) => {
    console.error('Error synchronizing the database:', err);
  });

module.exports = db;

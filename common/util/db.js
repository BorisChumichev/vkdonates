const Sequelize = require('sequelize')

require('./dotenv').config(
  [ 'DB_HOST'
  , 'DB_PORT'
  , 'DB_USER'
  , 'DB_DATABASE'
  , 'DB_PASSWORD'
  ]
)

module.exports = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USER,
  process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    pool: { max: 10, min: 0, idle: 10000 }
  }
)

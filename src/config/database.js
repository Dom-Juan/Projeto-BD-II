require('dotenv').config()

module.exports = {
  dialect: 'mysql',
  host: process.env.host,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  define:{
    timestamps: true,
    underscored: true,
  },
};
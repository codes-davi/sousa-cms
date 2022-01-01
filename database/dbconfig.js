const Sequelize = require('sequelize');
const connection = new Sequelize('sousa_cms', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    timezone: '-03:00'
});

module.exports = connection;
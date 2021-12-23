const Sequelize = require('sequelize');
const connection = new Sequelize('sousa_cms', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;
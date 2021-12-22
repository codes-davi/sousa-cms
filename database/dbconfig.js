const Sequelize = require('sequelize');
const connection = new Sequelize('nodinopress', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;
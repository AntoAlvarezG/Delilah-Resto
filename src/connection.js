const Sequelize = require('sequelize');

// database connection
const db = new Sequelize ('mysql://root@localhost:3306/delilah');

// connection test
db.authenticate().then(() => {
  console.log('Successful connection');
}).catch(err => {
  console.error('Connection error:', err)
});

module.exports = {
  Sequelize,
  db
};

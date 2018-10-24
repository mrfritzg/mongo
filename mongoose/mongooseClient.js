const mongoose = require('mongoose');

function connectAndMakeDatabase(dbName) {
  mongoose.connect('mongodb://localhost/' + dbName);
  const db = mongoose.connection;
  return new Promise((resolve, reject) => {
    db.on('error', err => {
      console.log('connection error:' + err);
      reject(new Error('connection error:' + err));
    });
    db.once('open', () => {
      resolve();
    });
  });
}

module.exports = connectAndMakeDatabase;

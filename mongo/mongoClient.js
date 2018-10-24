// Requiring in MongoClient
const MongoClient = require('mongodb').MongoClient;
// Local Mongo URL with default Mongo port.
const url = "mongodb://localhost:27017";

function makeCollection(db, collectionName) {
  return new Promise((resolve, reject) => {
    // Making a collection in the given database.
    db.createCollection(collectionName, function(err, res) {
      // Error handling.
      if (err) reject(err);
      // Server logging to confirm progress.
      console.log(`${collectionName} Collection created!`);

      // Resolve same db in order for later .then blocks to use it.
      resolve(db);
    });
  });
}

function makeConnection() {
  return new Promise((resolve, reject) => {
    // Connect to local Mongo database using MongoClient
    MongoClient.connect(url, { useNewUrlParser: true }, (err, conn) => {
      // Error handling.
      if (err) throw err;
      // Server logging to confirm progress.
      console.log('Connected to Mongo');
      // Resolve connection to Mongo.
      resolve(conn);
    });
  });
}

module.exports.makeCollection = makeCollection;
module.exports.makeConnection = makeConnection;

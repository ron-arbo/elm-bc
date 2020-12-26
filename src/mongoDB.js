// let secrets = require('./secrets.json')

// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://rarbo:" + secrets.password + "@cluster0.fd53q.mongodb.net/" + secrets.dbName + "?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db(secrets.dbName).collection("books");
//   // perform actions on the collection object
//   client.close();
// });

// function addBook() {
//     let db = client.db(secrets.dbName)
//     let col = db.collection("books")

//     let result = col.insert_one({"hello": "there"})
// }

const mongoose = require('mongoose');

const Connection = {

  dataBaseConnectionMongoDB(){
    mongoDBConnection = mongoose.connect("mongodb://localhost/nodejs", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    })
    .then(() => {
      console.log("Connection stablished with MongoDB");
    })
    .catch((error) => {
      console.log(`Erro ao estabelecer conexão com mongoDB: ${error}`)
    })
  }
}

module.exports = Connection;
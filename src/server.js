const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const routes = require('./routes');
const Connection = require('./config/Connection');

Connection.dataBaseConnectionMongoDB();

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use(routes);


app.listen(8080, () => {
  console.log(`App conected to port: 8080`);
})
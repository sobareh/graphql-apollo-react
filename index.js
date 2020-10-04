const express = require('express');
const morgan = require('morgan');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());

app.use(
  morgan(
    ':date[web] :method :url :status :res[content-length] - :response-time ms'
  )
);

// connect to mlab database
const uri =
  'mongodb://admin:admin123@development-shard-00-00.qtnz2.mongodb.net:27017,development-shard-00-01.qtnz2.mongodb.net:27017,development-shard-00-02.qtnz2.mongodb.net:27017/graphql-react?ssl=true&replicaSet=atlas-np3s1d-shard-0&authSource=admin&retryWrites=true&w=majority';
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.log('Error: ', err.message));

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(4000, () => {
  console.log('now listening on port 4000.');
});

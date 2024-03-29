const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const ActivityRouter = require("./routes/activity.route");

const app = express();

/* Loading the environment variables from the .env file. */
require('dotenv').config();

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

/* Allowing the frontend to access the backend. */
app.use(cors());
app.use(function (req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
})

/* Telling the application to use the express.json() middleware. This middleware will parse the body of
  any request that has a Content-Type of application/json. */
app.use(express.json());

/* Telling the application to use the ActivityRouter for any requests that start with "/api". */
app.use("/api", ActivityRouter);

/* This is a route handler. It is listening for a GET request to the root route of the application.
  When it receives a request, it will send back a response with the string "Hello World!". */
app.get('/', (req, res) => {
  res.send('Hello World!');
});

/* Connecting to the database and then starting the server. */
mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    app.listen(PORT, console.log('Server stated on port 5000.\nConnected to MongoDB'));
  })
  .catch(err => {
    console.log(err);
  });

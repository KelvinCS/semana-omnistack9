const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");

const app = express();

const mongodbURI =
  "mongodb+srv://omnistack:omnistack@omnistack-jyrl4.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(mongodbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(express.json());
app.use(routes);

app.listen(3333);

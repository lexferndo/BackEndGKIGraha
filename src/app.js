const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const bodyParser = require("body-parser");
const errorHandle = require("./api/middleware/error.handle");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(routes);
// app.use(errorHandle);

module.exports = app;

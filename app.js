require('dotenv').config();

const express = require("express");
const sequelize = require("./server/util/database");
const bodyParser = require("body-parser");
const cors = require('cors');

const app = express();

const todoRoutes = require("./server/routes/todo");

app.use(cors());
app.use(bodyParser.json());

app.use("/", todoRoutes);

sequelize
  .sync()
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));

const express = require("express");

const app = express();

const cors = require("cors");

const routes = require("./routes/user");

const chatroute = require("./routes/chat");
const messageroute = require("./routes/message");
app.use(cors());

app.use(express.json());

app.use("/", routes);
app.use("/chat", chatroute);
app.use("/", messageroute);

module.exports = app;

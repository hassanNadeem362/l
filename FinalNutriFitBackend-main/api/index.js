const express = require("express");
const dotenv = require("dotenv");
const http = require("http");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const Connection = require("../db/Connection");
const routes = require("../routes");

dotenv.config();
const Port = process.env.PORT;
const username = process.env.MONGO_USER;
const password = process.env.MONGO_PASS;

const app = express();
const server = http.createServer(app);

app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());
app.use("/api", routes);

Connection(username, password);

server.listen(Port, () => {
  console.log(`My server is running on ${Port}`);
});

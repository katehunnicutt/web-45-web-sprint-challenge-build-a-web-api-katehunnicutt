const express = require('express');
const actionsRouter = require("./actions/actions-router")
const projectsRouter = require("./projects/projects-router")
const server = express();
const cors = require("cors")


server.use(express.json()) //parse
server.use(cors())
server.use("/api/actions", actionsRouter)
server.use("/api/projects", projectsRouter)

server.get("/", (req, res) => {
  res.send(`<h1> sprint sudden death </hi>`)

})


module.exports = server;

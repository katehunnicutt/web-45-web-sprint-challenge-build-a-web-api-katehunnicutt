const express = require("express")
const cors = require("cors")


//const actionsRouter = require("./api/actions/actions-router")
//const projectsRouter = require("./api/projects/projects-router")
const PORT = process.env.PORT || 5000

const server = express() 

server.use(express.json())
server.use(cors())

server.get("/", (req, res) => {
  res.send("<h1>ugh</h1>")
})
server.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})

// module.exports = server
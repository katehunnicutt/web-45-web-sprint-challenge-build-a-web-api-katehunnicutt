require("dotenv").config() //allows env to work in ignored file
const server = require("./api/server")
const PORT = process.env.PORT || 5000



server.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})


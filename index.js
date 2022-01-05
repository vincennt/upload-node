const express = require("express")
const app = express()
const port = 5000
const cors = require("cors")
const filesRoutes = require("./routes/files")

app.use(cors())
app.use("/files", filesRoutes)

app.use(express.static('public'))

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
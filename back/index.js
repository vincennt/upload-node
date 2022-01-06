const express = require("express")
const app = express()
const port = 5000
const session = require("express-session")
const passport = require("./config/passport")
const cors = require("cors")

const authRoutes = require("./routes/auth")
const adminRoutes = require("./routes/admin")
const userPicture = require("./routes/picture")

app.use(cors({
  origin: "*",
  credentials: true
}))

app.use(express.json())

app.use(session({
  secret: "secret",
  resave: true,
  saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())

app.use("/", authRoutes)
app.use("/", adminRoutes)
app.use("/", userRoutes)

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
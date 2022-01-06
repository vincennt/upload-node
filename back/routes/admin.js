const express = require("express")
const app = express()
const fs = require("fs")
const { verifyUser } = require("../middlewares/auth")

app.get('/', verifyUser,  (req, res) => {
  fs.readFile('./users.json', (err, data) => {
    if (err) {
      console.log(err)
    } else {
      const users = JSON.parse(data)
      res.json(users)
    }
  })
})

module.exports = app
const express = require("express")
const app = express()

const users = require("../users.json")
const fs = require("fs")
const multer  = require('multer')

app.get('/:id', (req, res) => {
  const { id } = req.params
  const user = users.find(element => element.id === Number(id))

  res.json(user)
})

const upload = multer({ dest: 'public' })

app.post('/:id/picture', upload.single('picture'), (req, res) => {
  const { id } = req.params
  const userIndex = users.findIndex(element => element.id === id)

  
  
  fs.readFile('./users.json', (err, data) => {
    const users = JSON.parse(data)
    users[userIndex].profile_picture = `http://localhost:5000/${req.file.originalname}`

    fs.writeFile('./users.json', JSON.stringify(users), (err) => {
      res.json({ success: "File uploaded" })
    })
  })
})

module.exports = app
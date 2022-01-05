const express = require("express")
const app = express()
const multer = require("multer")
const fs = require("fs")

// configurer multer en lui spécifiant dans quel dossier
// on va upload nos images
const upload = multer({ dest: 'public' })

app.post('/', upload.single('photo'), (req, res) => {
  const photoUrl = `${req.file.destination}/${req.file.originalname}`
  fs.renameSync(req.file.path, photoUrl)
  
  fs.readFile('./users.json', (err, data) => {
    const users = JSON.parse(data)
    users[0].profile_picture = `http://localhost:5000/${req.file.originalname}`

    fs.writeFile('./users.json', JSON.stringify(users), (err) => {
      res.json({ success: "File uploaded" })
    })
  })

})

module.exports = app
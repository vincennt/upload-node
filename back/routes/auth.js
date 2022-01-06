const express = require("express")
const app = express()

const passport = require("../config/passport")
const fs = require("fs")
const users = require("../users.json")

//log whit lcoal strat
app.post('/login', passport.authenticate("local"), (req, res) => {
  if (req.user) {
    req.logIn(req.user, err => {
      if (err) {
        console.log(err)
      } else {
        res.json(req.user)
      }
    })
  }
})

//logout
app.delete('/logout', (req, res) => {
  req.logout()
  res.status(200).send("ok")
})

//signup
app.post('/signup', (req, res) => {

    //get key email/username in body
  const { email, username } = req.body
  //check if exist on the database
  let user = users.find(user => (
    user.username === username || user.email === email
  ))

  //exists :
  if (user) {
    res.status(409).json({ error: 'User already exists' })
  } else {
   // not exists :create whit body info + dyn id
    user = {
      ...req.body,
      id: users.length + 1
    }

    
    fs.readFile('./users.json', (err, data) => {
      if (err) {
        res.send(500).json({ error: "An error occured" })
      } else {
        let usersData = JSON.parse(data)
        usersData = [ ...usersData, user ]

        // write the new user after checking in my file (database)
        fs.writeFile('./users.json', JSON.stringify(usersData), err => {
          if (err) {
            res.send(500).json({ error: "An error occured" })
          } else {
            res.json(user)
          }
        })
      }
    })
  }
})

module.exports = app
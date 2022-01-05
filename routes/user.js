const express = require("express")
const app = express()

app.post("/user", (req,res)=>{
    console.log("hi");
})

module.exports = app
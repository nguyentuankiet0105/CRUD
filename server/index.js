const express = require('express')
const mongoose = require('mongoose')
const app = express()

app.listen(3000, () => {
 console.log("server is running on port 3000");
})

app.get("/", (req, res) => {
 res.send("Hello World @@@@ !!!")
})

mongoose.connect("mongodb+srv://kietnt:kietnt010599@kietnt.zcclaom.mongodb.net/?retryWrites=true&w=majority&appName=kietnt")
 .then(() => {
  console.log("connected to MongoDB...")
 })
 .catch((err) => {
  console.log("connection failed!", err)
 })
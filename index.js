const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.get('/oi', function (req, res) {
  res.send('Olá, mundo!')
})


const itens = [
              'Rick Sanchez', 
              'Morty Smith', 
              'Summer Smith'
              ]

//Endpoint Read All [GET] /item
app.get('/item', function (req, res){
  res.send(itens)
})

app.listen(3000)
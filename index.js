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

//Endpoint Read By ID [GET] /item/:id
app.get('/item/:id', function(req, res) {
  const temp = req.params.id
  res.send(itens[temp])
})


app.listen(3000)
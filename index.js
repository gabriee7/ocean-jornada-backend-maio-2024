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
  res.send(itens.filter(Boolean)) //Garante que não serão enviados dados null
})

//Endpoint Read By ID [GET] /item/:id
app.get('/item/:id', function(req, res) {
  const temp = req.params.id
  res.send(itens[temp])
})

//Para que o body da req [POST] virá como JSON
app.use(express.json())

//Endpoint Create [POST] /item
app.post('/item', function(req, res) {
  const body = req.body
  
  const newItem = body.nome

  itens.push(newItem)

  res.send(`Item ${newItem} adicionado com sucesso!`)
})


//Endpoint Update by ID [PUT] /item/:id
app.put('/item/:id', function(req, res) {
  //Acessa :id da requisicao 
  const id = req.params.id
  
  //Extrao o body da req
  const body = req.body
  const updateItem = body.nome

  itens[id] = updateItem

  res.send(`Item id ${id} atualizado para ${updateItem}.`)
})

//Endpoint Delete by ID [DELETE] /item/:id
app.delete('/item/:id', function(req, res) {
  const id = req.params.id

  delete itens[id]

  res.send(`ID: ${id} removido!`)
})

app.listen(3000)
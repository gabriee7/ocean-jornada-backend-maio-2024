const express = require('express')
const { MongoClient, ObjectId } = require('mongodb')

const dbUrl = 'mongodb+srv://admin:v9dtYBoi3uXbMFEW@cluster0.ujgiwb5.mongodb.net'
const dbName = 'ocean-jornada-backend-maio-2024'
const client = new MongoClient(dbUrl)

async function main(){
  console.log('Conectando com o Banco de Dados...')
  await client.connect()
  console.log('Conectado com o Banco de Dados...')

  const app = express()

  app.get('/', function (req, res) {
    res.send('Hello World!')
  })

  app.get('/oi', function (req, res) {
    res.send('Olá, mundo!')
  })

  const db = client.db(dbName)
  const collection = db.collection('item')

  const itens = [
                'Rick Sanchez', 
                'Morty Smith', 
                'Summer Smith'
                ]

  //Endpoint Read All [GET] /item
  app.get('/item', async function (req, res){
    const documents = await collection.find().toArray()
    
    res.send(documents) //Garante que não serão enviados dados null
  })

  //Endpoint Read By ID [GET] /item/:id
  app.get('/item/:id', async function(req, res) {
    const temp = req.params.id

    const item = await collection.findOne({ _id: new ObjectId(temp)})

    res.send(item)
  })

  //Para que o body da req [POST] virá como JSON
  app.use(express.json())

  //Endpoint Create [POST] /item
  app.post('/item', function(req, res) {
    const body = req.body
    
    const newItem = body.nome

    //itens.push(newItem)

    collection.insertOne({nome: newItem})

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
}

main()
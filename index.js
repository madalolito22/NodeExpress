const express = require('express')
const app = express()
const PORT = process.env.PORT ?? 1234

//Endpoint
app.get('/', (req, res) => {
    res.status(200).send('<a href="/pokemons/darkrai"><p>Darkrai</p></a>')
})

app.get('/pokemons/darkrai', (req, res) => {
    const pokemon = require('./pokemons/darkrai.json')
    res.setHeader('Content-Type', 'application/json; charset=utf-8')
    res.status(200).send(JSON.stringify(pokemon))
})

app.post('/pokemon', (req, res) => {
    let body = ''
    req.on('data', chunk => {
        body += chunk.toString()
    })
    req.on('end', () => {
        const data = JSON.parse(body)
        data.timestamp = Date.now()
        res.status(201).json(data)
    })
    res.json(req.body)
})

app.use((req, res) => {
    res.status(404).send('<h1>404 : Página no encontrada</h1 >')
})

//Inicialización de servidor
app.listen(PORT, () => {
    console.log(`server started on http://localhost:${PORT}`)
})
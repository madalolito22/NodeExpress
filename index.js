const express = require('express')
const app = express()
const PORT = process.env.PORT ?? 1234

//Endpoint
app.get('/', (req, res) => {
    res.status(200).send('<h1>Bienvenido a mi página web</h1>')
})

app.get('/', get_root)

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

//Inicialización de servidor
app.listen(PORT, () => {
    console.log(`server started on http://localhost:${PORT}`)
})
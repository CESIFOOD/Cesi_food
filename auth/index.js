require('dotenv').config();
const express = require('express')
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))

require('./src/routes/auth.routes')(app);

const port = process.env.PORT;

app.get('/',(req, res) => {
    res.send('HELLO WORLD')
})

app.listen(port, () => {
    console.log(`Louis écoute sur le port ${port}`)
})
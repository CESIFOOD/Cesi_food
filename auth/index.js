require('dotenv').config();
const express = require('express')
const cors = require('cors')


const app = express()
app.use(express.json())
const port = 3000;
// app.use(express.urlencoded({extended:true}))

  
app.use(cors({
    origin: "*", // L'origine de ton frontend
    // methods: ["GET", "POST", "PUT", "DELETE"], 
  }));
  
require('./src/routes/auth.routes')(app);

app.get('/louis',(req, res) => {
    res.send('HELLO WORLD')
})


app.get('/',(req, res) => {
    res.send('HELLO WORLD')
})

app.listen(port, () => {
    console.log(`Louis écoute sur le port ${port}`)
})
// require('dotenv').config();
const express = require('express')
const app = express()
app.use(express.json())
const cors = require('cors')

// app.use(express.urlencoded({extended:true}))
const corsOptions = {
    origin: "*", // L'origine de ton frontend
    // methods: ["GET", "POST", "PUT", "DELETE"], 
  };
  
app.use(cors(corsOptions));
  

require('./src/routes/auth.routes')(app);
const port = 3000;

app.get('/',(req, res) => {
    res.send('HELLO WORLD')
})

app.listen(port, () => {
    console.log(`Louis écoute sur le port ${port}`)
})
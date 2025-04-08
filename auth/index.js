require('dotenv').config();
const express = require('express')
const cors = require('cors')
const sequelize = require('./config/config');

const app = express()
app.use(express.json())
const port = 3000;
// app.use(express.urlencoded({extended:true}))

  
app.use(cors({
    origin: "*", // L'origine de ton frontend
    // methods: ["GET", "POST", "PUT", "DELETE"], 
  }));
  
require('./src/routes/auth.routes')(app);

// Synchroniser la base de données pour ajouter la colonne "suspended"
sequelize.sync({ alter: true }).then(() => {
    console.log("Base de données synchronisée avec succès.");
}).catch((error) => {
    console.error("Erreur lors de la synchronisation de la base de données :", error);
});



app.listen(port, () => {
    console.log(`Louis écoute sur le port ${port}`)
})
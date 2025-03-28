const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose')
const cors = require('cors')
const livraisonRoute = require('./src/routes/livraisonRoute')

app.use (express.json())

const corsOptions = {
  origin: "*", // Accès du back-end pour les domaines ci-contre
  optionsSuccessStatus: 200
}

// Autoriser la l'accès au back-end (CORS POLICY)
app.use(cors(corsOptions))

// Routes
app.use('/api/livraisons', livraisonRoute);


app.get('/',function(req, res) {
  res.status(200).json({ msg: "Welcome to the livraison service" });
});

mongoose.connect('mongodb+srv://admin:admin@cluster1.cxdb4.mongodb.net/LivraisonCollection?retryWrites=true&w=majority&appName=Cluster1')
.then(() => {
  console.log("Connected to Livraison Collection")
  app.listen(port, () => {
    console.log(`Livraison service listening on port ${port}`);
  });
}).catch((error) => {
  console.log(error)
})

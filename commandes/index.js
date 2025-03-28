const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose')
const cors = require('cors')
const orderRoute = require('./src/routes/commandeRoute')

app.use(express.json())

const corsOptions = {
  origin: "*", // Accès du back-end pour les domaines ci-contre
  optionsSuccessStatus: 200
}

// Autoriser la l'accès au back-end (CORS POLICY)
app.use(cors(corsOptions))


// Routes
app.use('/api/commandes', orderRoute);

app.get('/',function(req, res) {
  res.status(200).json({ msg: "Welcome to the order service" });
});

mongoose.connect('mongodb+srv://admin:admin@cluster1.cxdb4.mongodb.net/CommandeCollection?retryWrites=true&w=majority&appName=Cluster1')
.then(() => {
  console.log("Connected to Restaurant Collection")
  app.listen(port, () => {
    console.log(`Order service listening on port ${port}`);
  });
}).catch((error) => {
  console.log(error)
})






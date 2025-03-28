const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose')
const cors = require('cors')
const userRoute = require('./src/routes/restaurantRoute')

const FRONTEND = "http://127.0.0.1:5173"


// express prend les requêtes en JSON
app.use (express.json())

const corsOptions = {
  origin: "*", // Accès du back-end pour les domaines ci-contre
  optionsSuccessStatus: 200
}

// Autoriser la l'accès au back-end (CORS POLICY)
app.use(cors(corsOptions))

// Routes
app.use('/api/restaurants', userRoute);

app.get('/',function(req, res) {
  res.status(200).json({ msg: "Welcome to the restaurants service" });
});


mongoose.connect('mongodb+srv://admin:admin@cluster1.cxdb4.mongodb.net/RestaurantCollection?retryWrites=true&w=majority&appName=Cluster1')
.then(() => {
  console.log("Connected to Restaurant Collection")
  app.listen(port, () => {
    console.log(`Restaurant service listening on port ${port}`);
  });
}).catch((error) => {
  console.log(error)
})



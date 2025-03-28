const express = require('express');
const mongoose = require('mongoose')
const app = express();
const port = 3000;
const cors = require('cors')
const articleRoute = require('./src/routes/articleRoute')

app.use(express.json())

const corsOptions = {
  origin: "*", // Accès du back-end pour les domaines ci-contre
  optionsSuccessStatus: 200
}

// Autoriser la l'accès au back-end (CORS POLICY)
app.use(cors(corsOptions))


// Routes 
app.use('/api/articles', articleRoute)

app.get('/',function(req, res) {
  res.status(200).json({ msg: "Welcome to the articles service" });
});



mongoose.connect('mongodb+srv://admin:admin@cluster1.cxdb4.mongodb.net/ArticleCollection?retryWrites=true&w=majority&appName=Cluster1')
.then(() => {
  console.log("Connected to ArticleCollection")
  app.listen(port, () => {
    console.log(`Article service listening on port ${port}`);
  });
}) .catch((error) => {
  console.log(error)
})


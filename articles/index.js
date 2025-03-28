const express = require('express');
const mongoose = require('mongoose')
const app = express();
const port = 3000;


mongoose.connect('mongodb+srv://admin:admin@cluster1.cxdb4.mongodb.net/ArticleCollection?retryWrites=true&w=majority&appName=Cluster1')
.then(() => {
  console.log("Connected to ArticleCollection")
  app.listen(port, () => {
    console.log(`Article service listening on port ${port}`);
  });
}) .catch((error) => {
  console.log(error)
})

app.get('/',function(req, res) {
  res.status(200).json({ msg: "Welcome to the articles service" });
});

app.get('/blog',function(req, res) {
  res.status(200).json({ msg: "Welcome to the articles blog service" });
});


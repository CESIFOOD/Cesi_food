const express = require('express');
const app = express();
const port = 3000;

app.get('/',function(req, res) {
  res.status(200).json({ msg: "Welcome to the menu service" });
});

app.listen(port, () => {
  console.log(`Public service listening on port ${port}`);
});
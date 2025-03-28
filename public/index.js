const express = require('express');
const app = express();
const port = 3000;
const Louis = require("./middlewares/roleMiddlewarecopy")

app.get('/', Louis()  ,function(req, res) {
  res.status(200).json({ msg: "Welcome to the public service" });
});

app.listen(port, () => {
  console.log(`Public service listening on port ${port}`);
});
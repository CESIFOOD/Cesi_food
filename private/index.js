
const express = require('express');
const app = express();
const port = 3000;
const verifyRoleMiddleware = require('./middlewares/roleMiddleware')

app.use((req, res, next) => {
    console.log("Headers reçus par /private :", req.headers);
    next();
});

app.get('/', verifyRoleMiddleware('restaurateur') ,function(req, res) {
  res.status(200).json({ msg: "Welcome to the private service" });
});

app.listen(port, () => {
  console.log(`Private service listening on port ${port}`);
});
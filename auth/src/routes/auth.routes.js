const authController = require("../controllers/auth.controllers");

module.exports = function(app) {
    app.post("/register", authController.register)
    app.post("/login", authController.login)
    app.get("/authenticate", authController.authenticate);
}
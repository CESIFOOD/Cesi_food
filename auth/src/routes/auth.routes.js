const authController = require("../controllers/auth.controllers");

module.exports = function(app) {
    app.post("/register", authController.register);
    app.post("/login", authController.login);
    app.get("/authenticate", authController.authenticate);
    app.delete("/delete", authController.deleteUser);
    app.put("/update", authController.updateUser);

    app.get("/users", authController.getUsers);
    // app.get("/users/:id", authController.getUser);
    // app.delete("/users/:id", authController.deleteUser);
    // app.put("/users/:id", authController.updateUser);
    // app.put("/users/:id/suspend", authController.suspendUser);
}
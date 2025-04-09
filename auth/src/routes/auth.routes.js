const authController = require("../controllers/auth.controllers");

module.exports = function(app) {
    app.post("/register", authController.register);
    app.post("/login", authController.login);
    app.get("/authenticate", authController.authenticate);
    app.delete("/delete", authController.deleteUser);
    app.put("/update", authController.updateUser);

    app.get("/users", authController.getUsers);
    app.get("/users/:username", authController.getUser);
    app.delete("/users/:username", authController.deleteUserByUsername);
    app.put("/users/:username", authController.updateUser);
    app.put("/users/:id/suspend", authController.suspendUser);
    app.put("/users/:id/unsuspend", authController.unsuspendUser);
}
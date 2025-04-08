const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user.model');
const sequelize = require("../../config/config");
require('dotenv').config();

// Synchroniser la base de données au démarrage
sequelize.sync();

exports.register = async (req, res) => {
    try {
        const { username, password, role } = req.body;
        // Vérifier si l'utilisateur existe déjà
        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) {
            return res.status(400).json({ msg: "Username already exists." });
        }

        // Hacher le mot de passe et enregistrer dans PostgreSQL
        const hashedPassword = bcrypt.hashSync(password, 10);
        console.log(`Tentative d'enregistrement: ${username}, ${role}`);
        const newUser = await User.create({ username, password: hashedPassword, role: role || "user" });
        res.status(201).json({ msg: "User registered successfully", user: newUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error during registration." });
    }
};

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Vérifier l'existence de l'utilisateur
        const user = await User.findOne({ where: { username } });
        if (!user || !bcrypt.compareSync(password, user.password)) {
            return res.status(401).json({ msg: "Invalid username or password." });
        }

        // Générer les tokens
        const accessToken = jwt.sign({ username: user.username, role: user.role }, "JWT", { expiresIn: "1h" });
        const refreshToken = jwt.sign({ username: user.username, role: user.role }, process.env.JWT_REFRESH_KEY, { expiresIn: "7d" });

        // Enregistrer le refresh token dans la BDD
        user.refreshToken = refreshToken;
        await user.save();

        res.status(200).json({ msg: "Login successful!", accessToken, refreshToken, role: user.role });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error during login." });
    }
};

exports.authenticate = async (req, res) => {
    console.log(req.headers)

    const authHeader = req.headers["authorization"];
    if (!authHeader) {
        return res.status(401).json({ msg: "Authorization header is missing." });
    }
    console.log(authHeader)

    const token = authHeader.split(" ")[1];
    console.log(token)
    if (!token) {
        return res.status(401).json({ msg: "Token is missing." });
    }
    
    try {
        const decoded = jwt.verify(token, "JWT");


        const user = await User.findOne({ where: { username: decoded.username } });

        if (!user) {
            return res.status(404).json({ msg: "User not found." });
        }

        res.setHeader("X-User-Role", user.role);
        // return res.status(200).json({ msg: "Token verified successfully."})
        return res.status(200).json({ msg: "Token verified successfully.", user: { username: user.username , role: user.role }});
    } catch (err) {
        return res.status(403).json({ msg: "Invalid or expired token." });
    }
    return res.send({authHeader})
};


exports.deleteUser = async (req, res) => {
    const { username } = req.body;  // On récupère directement 'username' dans req.body
    console.log(req.body);
    console.log(username);

    try {
        // Recherche de l'utilisateur par son 'username'
        const user = await User.findOne({ where: { username } });

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        // Suppression de l'utilisateur trouvé
        await user.destroy();

        res.status(200).json({ msg: 'User deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error during deletion' });
    }
};


exports.updateUser = async (req, res) => {
    const { username, newPassword, newRole } = req.body;

    try {
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(404).json({ msg: "User not found." });
        }

        if (newPassword) {
            const hashedPassword = bcrypt.hashSync(newPassword, 10);
            user.password = hashedPassword;
        }

        if (newRole) {
            user.role = newRole;
        }
        
        await user.save();

        res.status(200).json({ msg: "User updated successfully." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error during update." });
    }
};

exports.getUsers = async (req, res) => {
    try {
        const users = await User.findAll(); // Récupère tous les utilisateurs
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error fetching users." });
    }
};

exports.getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ msg: "User not found." });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error fetching user." });
    }
};

exports.suspendUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ msg: "User not found." });
        }
        user.suspended = true;
        await user.save();
        res.status(200).json({ msg: "User suspended successfully." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error suspending user." });
    }
};


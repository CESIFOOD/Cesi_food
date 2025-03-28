const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user.model');
const sequelize = require("../../config/config");

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
        const accessToken = jwt.sign({ username: user.username, role: user.role }, process.env.JWT_KEY, { expiresIn: "1h" });
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
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
        return res.status(401).json({ msg: "Authorization header is missing." });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json({ msg: "Token is missing." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        const user = await User.findOne({ where: { username: decoded.username } });

        if (!user) {
            return res.status(404).json({ msg: "User not found." });
        }

        res.setHeader("X-User-Role", user.role);
        return res.status(200).json({ msg: "Token verified successfully.", user: { username: user.username }, role: user.role });
    } catch (err) {
        return res.status(403).json({ msg: "Invalid or expired token." });
    }
};










// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');

// const User = require('../models/user.model')
// const User_DB = [];

// exports.register = (req, res) => {
//     try {
//         var newUser = new User(req.body.username, bcrypt.hashSync(req.body.password, 10), req.body.role || "user")
//         User_DB.push(newUser);
//         res.status(201).json({ "msg": "New User Created ?" })
//         console.log("Users in DB:", User_DB);
//     } catch (error) {
//         console.log(error)
//     }
// };

// exports.login = (req, res) => {
//     // Extraction des informations de la requête (username et password)
//     const { username, password } = req.body;

//     // Recherche de l'utilisateur dans la "base de données" simulée
//     const user = User_DB.find((u) => u.username === username);

//     // Vérification que l'utilisateur existe et que le mot de passe est correct
//     if (!user || !bcrypt.compareSync(password, user.password)) {
//         return res.status(401).json({ msg: "Invalid username or password." }); // Si l'utilisateur n'existe pas ou si le mot de passe est incorrect
//     }

//     // Génération d'un jeton d'accès (JWT) pour l'utilisateur, valide pendant 1 heure
//     const accessToken = jwt.sign(
//         { username: user.username, role : user.role },
//         process.env.JWT_KEY, // Clé secrète pour signer le token (devrait être définie dans les variables d'environnement)
//         { expiresIn: "1h" } // Durée de validité du token d'accès (1 heure)
//     );

//     // Génération d'un refresh token valide pendant 7 jours
//     const refreshToken = jwt.sign(
//         { username: user.username, role: user.role},
//         process.env.JWT_REFRESH_KEY, // Clé secrète différente pour le refresh token
//         { expiresIn: "7d" } // Durée de validité du refresh token (7 jours)
//     );

//     // Sauvegarde du refresh token dans l'utilisateur (en mémoire ici)
//     user.refreshToken = refreshToken;

//     // Réponse indiquant que la connexion a réussi, avec les tokens générés
//     console.log("User logged in:", user);
//     return res.status(200).json({
//         msg: "Login successful!",
//         accessToken,
//         refreshToken,
//         role: user.role
//     });
// };


// exports.authenticate = (req, res) => {
//     // Récupération de l'en-tête d'autorisation (Authorization) de la requête
//     const authHeader = req.headers["authorization"];
//     if (!authHeader) {
//         return res.status(401).json({ msg: "Authorization header is missing." }); // Si l'en-tête d'autorisation est absent
//     }

//     // Extraction du token de l'en-tête (le format attendu est "Bearer <token>")
//     const token = authHeader.split(" ")[1];
//     if (!token) {
//         return res.status(401).json({ msg: "Token is missing." }); // Si le token est absent
//     }
    
//     // Vérification du token avec la clé secrète pour valider sa signature
//     jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
//         if (err) {
//             return res.status(403).json({ msg: "Invalid or expired token." }); // Si le token est invalide ou expiré
//         }

//         // Recherche de l'utilisateur correspondant au token décodé
//         const user = User_DB.find((u) => u.username === decoded.username);
//         if (!user) {
//             return res.status(404).json({ msg: "User not found." }); // Si l'utilisateur n'est pas trouvé
//         }

//         // Réponse indiquant que le token est valide
//         res.setHeader("X-User-Role", user.role);
//         return res.status(200).json({
//             msg: "Token verified successfully.",
//             user: { username: user.username },
//             role: user.role,
//         });
//     });
// };




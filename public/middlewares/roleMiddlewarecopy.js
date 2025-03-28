
// Middleware pour vérifier le token et le rôle
const verifyRole = () => {
    return (req, res, next) => {
        console.log("je suis le middlewared de Louis")

        next();
    };
}

module.exports = verifyRole
const jwt = require('jsonwebtoken');

// Middleware pour vérifier le token et le rôle
const verifyRole = (requiredRole) => {
    return (req, res, next) => {
        const authHeader = req.headers["authorization"];
        const token = authHeader.split(" ")[1];

        const decodedToken = jwt.decode(token)

        if(!decodedToken.role){
            return res.status(403).json({ message: 'Unauthorized: No user found'  })
        }

        if (decodedToken.role !== requiredRole) {
             return res.status(403).json({ message: 'Forbidden: Insufficient role' });
        }
        
        if(decodedToken.role == requiredRole) {
            next()
        }
    };
}

module.exports = verifyRole
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const authentification = async (req,res,next) => {
    try {
        const authorizationHeader = req.header('Authorization');
        if (!authorizationHeader) {
            throw new Error('Authorization header missing');
        }

        // Extraire le token en retirant 'Bearer ' du début de l'en-tête
        const authToken = authorizationHeader.replace('Bearer ', '');

        // Vérification si le token est vide ou mal formé
        if (!authToken) {
            throw new Error('Token is missing or malformed');
        }

        
        const decodedToken = jwt.verify(authToken, 'foo')
        const sec = await Secretaire.findOne({
            _id: decodedToken._id, 
            'authTokens.authToken': authToken
        })

         // Vérifier si le token existe dans l'utilisateur
         const tokenExists = sec?.authTokens.some(tokenObj => tokenObj.authToken === authToken)
         if (!tokenExists) throw new Error('Token non valide ou expiré')
        
         if(!sec) throw new Error('Utilisateur non trouvé ou non authentifié')
 
         // Vérifiez quels tokens sont stockés pour cet utilisateur
         // console.log('Tokens stockés:', sec?.authTokens);

         req.authToken = authToken;
        req.sec = sec;

        next()

    } catch (error) {
        console.log(error)
        res.status(401).send(('Merci de vous authentifier!' ))
    }
}

module.exports = authentification


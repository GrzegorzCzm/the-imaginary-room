const jwt = require('jsonwebtoken');

const getDecodedToken = request => {
    const encriptedToken = request.get('authorization');
    if(encriptedToken && encriptedToken.toLowerCase().startsWith('bearer ')){
        const tokenString = encriptedToken.substring(7);
        const decodedToken = jwt.verify(tokenString, process.env.SECRET);
        return decodedToken;
    }
    return null;
}

module.exports = getDecodedToken;
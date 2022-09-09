const jwt = require("jsonwebtoken");

const security = {
    secretKey: "abcdef",
    expiresIn: 24 * 60 * 60
}

const getToken = ({uid, scope = 2}) => {
    return jwt.sign({
        uid,
        scope
    }, 
    security.secretKey, 
    {
        expiresIn: security.expiresIn
    })
}

const checkToken = (token) => {
    return jwt.verify(token, security.secretKey)
}

module.exports = {
    getToken,
    checkToken
}

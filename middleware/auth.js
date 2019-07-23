const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = (req,res,next)=>{
    // Get token from header
    const token =req.header('x-auth-token')

    // check if not token
    if(!token) {
        return res.status(401).json({msg:' No Token , authoriztion denied'})
    }
    // verfiy token 
    try {
        const decoded = jwt.verify(token,config.get('jwtSecret'))
        req.user = decoded.user
        next()
    } catch(err){
        res.status(404).json({msg:' Token is not valid'})
    }
}
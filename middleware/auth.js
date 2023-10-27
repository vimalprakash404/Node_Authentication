const jwt = require("jsonwebtoken")
function authenticateToken(req, res , next)
{
 const token = req.header('Authorization');

 if ( !token)
 {
    return res.status(401).json({message : 'Authentication required'});
 }

 jwt.verify(token, 'key' , (err, user)=>
 {
    if (err)
    {
     return res.status(403).json({message : "Invalid token"})
    }

    req.user = user;
    next();
 })
}

function datacheck(req, res , next)
{
 console.log("data is here");
 next();
}


module.exports = { authenticateToken , datacheck}
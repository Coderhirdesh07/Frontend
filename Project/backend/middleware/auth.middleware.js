const jwt = require('jsonwebtoken');

function verifyJwt(request,response,next){
    try{
        const accessToken = request.headers['authorization'];
        if(!accessToken) return response.status(401).json({message:'Access Token not found'});
        const bearerToken = accessToken.split(' ')[1];
        if(!bearerToken) return response.status(401).json({message:"Token not found"});
        const decoded = jwt.verify(bearerToken,process.env.ACCESS_TOKEN_SECRET_KEY);
        request.user = decoded;
        next();
    }
    catch(error){
        return response.status(400).json({message:'Unknown error occured'});
    }
}


module.exports = verifyJwt;
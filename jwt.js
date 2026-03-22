const jwtwebtoken = require("jsonwebtoken");

const jasonmiddleware = (req,res,next)=>{

    const token = req.headers.authorization.split(" ")[1];

    if(!token){
        return res.status(401).json({error : "unauthorized"});
    }

    try {

        const decoded = jwtwebtoken.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
         next();
    } catch (error) {

        res.status(500).json({error : "unauthorized"});
        
    }

   
}


// for token generation

const jwttokengenerator = (userData)=>{
    return jwttokengenerator.toString(userData, process.env.JWT_SECRET);
}

module.exports = {jasonmiddleware,jwttokengenerator} ;
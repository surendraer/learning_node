//JWT token authorisation middle ware

const jwtwebtoken = require("jsonwebtoken");

// function to verify the token and extract the user details from it and send it to the route that user requested
const jasonmiddleware = (req,res,next)=>{

        const authHeader = req.headers.authorization;

    // Expected format: "Bearer <token>"
    if (!authHeader) {
        return res.status(401).json({ error: "unauthorized" });
    }

// because the token comes with a bearer keyword we are removing it below
    const token = req.headers.authorization.split(" ")[1];
// if theres no token
    if(!token){
        return res.status(401).json({error : "unauthorized"});
    }
//if token is found
    try {
//verify is used to decode the token and verify the signature, it takes two arguments , the token and a secret key(usually we give it)
        const decoded = jwtwebtoken.verify(token, process.env.JWT_SECRET);
        // sending the decoded details (payload to the further router in user key in req body)
        req.user = decoded;
        // callback function 
         next();
    } catch (error) {

        res.status(500).json({error : "unauthorized"});
        
    }   
}

// for token generation when user is signing up,loging in
// it will just take the user data 
const jwttokengenerator = (userData)=>{
    // sign creates a token
    return jwtwebtoken.sign({userData}, process.env.JWT_SECRET);
    //use user data as object for expire method better practice
}

module.exports = {jasonmiddleware,jwttokengenerator} ;
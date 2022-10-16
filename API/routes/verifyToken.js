const jwt = require("jsonwebtoken");

const verifyToken = (req,res,next) => {
    const authHeader = req.headers.token;
    if(authHeader){
        const token = authHeader.split(" ")[1];
        //pour vérifier que le token est bien celui d'un utilisateur existant dans mongo
        jwt.verify(token, process.env.JWT_SEC, (err,user)=>{
            if(err)
                res.status(403).json("Token is not valid!");
            req.user=user;
            next();
        })
    }else{
        res.status(401).json("You are not authenticated!");
    }
}

const verifyTokenAndAuthorization = (req,res,next) => {
    //pour vérifier que le token est bien celui d'un user / celui d'un admin
    verifyToken(req,res,()=>{
        if(req.user.id === req.params.id || req.user.isAdmin){
            next(); //pour faire la suite du code
        }else{
            res.status(403).json("You are not allowed to do that !");
        }
    })
}

const verifyTokenAndAdmin = (req,res,next) => {
    //vérifier que le token est celui d'un admin
    verifyToken(req,res,()=>{
        if(req.user.isAdmin){
            next(); //pour faire la suite du code
        }else{
            res.status(403).json("You are not allowed to do that !");
        }
    })
}

module.exports = {verifyToken,verifyTokenAndAuthorization,verifyTokenAndAdmin};
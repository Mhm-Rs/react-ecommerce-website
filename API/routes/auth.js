//chemin d'authentification

const router = require("express").Router();
const User = require("../models/User")
const CryptoJS = require("crypto-js"); 
const jwt = require("jsonwebtoken");

//REGISTER
router.post("/register", async (req,res)=>{
    const newUser = new User({
        username:req.body.username,
        email:req.body.email,
        password:CryptoJS.AES.encrypt(req.body.password,process.env.PASS_SEC).toString(), //cryptage du mot de passe
    });
    try{
        const savedUser = await newUser.save(); //enregistrer l'utilisateur créé dans mongo
        res.status(201).json(savedUser);
    }catch(err){
        res.status(400).json(err);
    }
});


//LOGIN

router.post("/login", async (req,res)=>{
   try{
       const user = await User.findOne({username:req.body.username}); //trouver 1 utilisateur avec le username entré

        !user&& res.status(401).json("Wrong credentials !"); //si on a pas trouvé de mot de passe

       const hashedPassword = CryptoJS.AES.decrypt(user.password,process.env.PASS_SEC); //mot de dépasse décrypté 
       const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8); //mot de passe réencodé en  UTF-8

       originalPassword !== req.body.password && res.status(401).json("Wrong credentials !"); //si on a pas trouvé de mot de passe

        const accessToken = jwt.sign({
            id:user._id,
            isAdmin:user.isAdmin
        }, //webToken utilisé pour identifier l'utilisateur
        process.env.JWT_SEC,
        {expiresIn:"3d"}    
    );

       const {password, ...others} = user._doc; //conservation du mot de passe

       res.status(200).json({...others,accessToken}); //afficher tout sauf le mot de passe
    } catch(err){
         res.status(500).json(err);
   }
}); 

module.exports = router;

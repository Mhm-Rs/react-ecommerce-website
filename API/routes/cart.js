//chemin du cart

const Cart = require("../models/Cart");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");

const router = require("express").Router();

//CREATE
router.post("/",verifyToken , async (req,res)=>{
    const newCart = new Cart(req.body); //création d'un cart avec les données contenues dans la requête
    try{
        const savedCart = await newCart.save() //enregistrement du cart dans mongo
        res.status(200).json(savedCart);
    }catch(err){
        res.status(500).json(err);
    }
})


//UPDATE
router.put("/:id",verifyTokenAndAuthorization, async (req,res)=>{
    try{
        const updatedCart = await Cart.findByIdAndUpdate( //trouver un cart avec l'id donné en requête et modification
            req.params.id,
            {
            $set:req.body
            },
        {new:true})
        res.status(200).json(updatedCart); //afficher le cart
    }catch(err){
        res.status(500).json(err);
    }
});

//DELETE
router.delete("/:id",verifyTokenAndAuthorization, async (req,res)=>{
    try{
        await Cart.findByIdAndDelete(req.params.id);
        res.status(200).json("Cart has been deleted !") //trouver un cart avec l'id donné en requête et suppression
    }catch(err){
        res.status(500).json(err);
    }
})

//GET USER CART
router.get("/find/:userId",verifyTokenAndAuthorization, async (req,res)=>{
    try{
        const cart = await Cart.findOne({userId: req.params.userId}); 
        // trouver un cart avec l'id donné en requête et affichage
        res.status(200).json(cart);
    }catch(err){
        res.status(500).json(err);
    }
})

//GET ALL CARTS
router.get("/",verifyTokenAndAdmin, async (req,res)=>{
    try{
        const carts = await Cart.find(); //trouver tous les cartes si admin
        res.status(200).json(carts);
    }catch(err){
        res.status(500).json(err);
    }
})

module.exports = router;
//chemin de la commande

const Order = require("../models/Order");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");

const router = require("express").Router();

//CREATE
router.post("/",verifyToken , async (req,res)=>{
    const newOrder = new Order(req.body); //création d'une commande
    try{
        const savedOrder = await newOrder.save() //enregistrement de la commande dans mongo
        res.status(200).json(savedOrder);
    }catch(err){
        res.status(500).json(err);
    }
})

//UPDATE
router.put("/:id",verifyTokenAndAdmin, async (req,res)=>{
    try{
        //trouver une commande avec l'id donné en requête et modification si admin
        const updatedOrder = await Order.findByIdAndUpdate( 
            req.params.id,
            { 
            $set:req.body
            },
        {new:true})
        res.status(200).json(updatedOrder);
    }catch(err){
        res.status(500).json(err);
    }
});

//DELETE
router.delete("/:id",verifyTokenAndAdmin, async (req,res)=>{
    try{
        //trouver une commande avec l'id donné en requête et suppression si admin
        await Order.findByIdAndDelete(req.params.id);
        res.status(200).json("Order has been deleted !")
    }catch(err){
        res.status(500).json(err);
    }
})

//GET USER ORDER
router.get("/find/:userId",verifyTokenAndAuthorization, async (req,res)=>{
    try{
        //trouver une commande avec l'id donné en requête et affichage
        const orders = await Order.find({userId: req.params.userId});
        res.status(200).json(orders);
    }catch(err){
        res.status(500).json(err);
    }
})

//GET ALL OrderS
router.get("/",verifyTokenAndAdmin, async (req,res)=>{
    try{
        //trouver tous les orders
        const orders = await Order.find();
        res.status(200).json(orders);
    }catch(err){
        res.status(500).json(err);
    }
})

module.exports = router;
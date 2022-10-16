//modèle de la commande: Id de l'utilisateur, tableau de produits avec pour chacun un id et une quantité, quantitétotale, adresse et statut

const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
    {
        userId:{type:String, required:true},
        products: [
            {
                productId:{type:String},
                quantity:{type:Number,default:1},
            }
        ],
        amount:{type:Number,required:true},
        address:{type:Object,required:true},
        status:{type:String,default:"Pending"},
    },
    {
        timestamps:true,
    }  
);

module.exports = mongoose.model("Order",OrderSchema);
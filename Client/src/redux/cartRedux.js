import {createSlice} from "@reduxjs/toolkit"

//SLICE CONTENANT LES ELEMENTS DU CART : Produits, quantité, prix total
const cartSlice = createSlice({
    name:"cart",
    initialState:{
        products:[],
        quantity:0,
        total:0,
    },
    reducers:{
        addProduct:(state,action)=>{
            state.quantity+=1; //augmenter la quantité
            state.products.push(action.payload); //ajouter un produit au cart
            state.total+=action.payload.price * action.payload.quantity; //ajouter le prix d'un produit au prix total
        }
    }
})

export const {addProduct} = cartSlice.actions;
export default cartSlice.reducer;

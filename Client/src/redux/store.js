import {configureStore} from "@reduxjs/toolkit"
import cartReducer from "./cartRedux"

//STORE DU CART
export default configureStore({
    reducer:{
        cart: cartReducer,
    }
})
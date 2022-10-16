import Cart from "./pages/Cart"
import Home from "./pages/Home"
import Product from "./pages/Product"
import ProductList from "./pages/ProductList"
//import Register from "./pages/Register"
//import Login from "./pages/Login"

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
 // Navigate,
} from "react-router-dom"
import Success from "./pages/Success"
//import { useSelector } from "react-redux"

export default function App() {
  //const user = useSelector((state)=>state.user.currentUser);
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
      <Route
        path="/"
        element={<Home/>}
        />
        <Route
         path="/products/:category"
         element={<ProductList/>}
        />
        <Route
         path="/product/:id"
         element={<Product/>}
        />
        <Route
         path="/cart"
         element={<Cart/>}
        />
       { /* <Route
         path="/login"
         element={user ? <Navigate to="/"/> : <Login/> }
        ></Route>
        <Route
         path="/register"
         element={user ? <Navigate to="/"/> : <Register/> }
    /> */ }
        <Route
         path="/success"
         element={<Success/>}
        />
        </Route>
    )
  )
  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  )
}

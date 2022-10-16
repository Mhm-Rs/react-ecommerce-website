//BARRE DE NAVIGATION


import "./icons.css"
import React from 'react'
import styled from 'styled-components'
import { mobile } from "../responsive";
import { useSelector } from "react-redux";
import { Link} from "react-router-dom";

const Container = styled.div`
    height: 60px;
    ${mobile({
      height:"50px"
    })}
    
`;
const Wrapper = styled.div`
    padding:10px 20px;
    display:flex;
    justify-content:space-between;
    align-items:center;
    ${mobile({ padding: "10px 0px" })}
`
const Left = styled.div`
  flex:1;
  display:flex;
  align-items:center;

`

const Language = styled.span`
  font-size:14px;
  cursor:pointer;
  ${mobile({ display: "none" })}
`
const Center = styled.div`
  flex:1;
  text-align:center;
`

const Logo = styled.h1`
  font-weight:bold;
  ${mobile({ fontSize: "24px" })}
`
const Right = styled.div`
  flex:1;
  display:flex;
  align-items:center;
  justify-content:flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}

`

const MenuItem = styled.div`
  font-size:14px;
  cursor:pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
  
`

const Badge = styled.div`
  height: 20px;
  width:20px;
  position:absolute;
  top:-10px;
  right:-10px;
  border-radius:50%;
  background-color:lightblue;
  display:flex;
  align-items:center;
  justify-content:center;
  color:white;

`

const Cart = styled.div`
  width:25px;
  position:relative;
`
const Navbar = () => {
    const quantity = useSelector(state=>state.cart.quantity) //la quantité de produits commandés, venant du store
    
  return (
    <Container>
        <Wrapper>
          <Left>
            <Language>EN</Language> {/*Pas changeable pour le moment. */}
          </Left>
          <Center><Logo><Link className="link" to={"/"}>Mhm_Rs.</Link></Logo></Center>
          <Right>
            <MenuItem>REGISTER</MenuItem>
            <MenuItem>SIGN IN</MenuItem> {/* Connexion pas encore configurée */}
            <Link to={"/cart"} className="link">
            <MenuItem>
              <Cart>
                <i className="fa-solid fa-cart-shopping"></i>
                {quantity ? <Badge>{quantity}</Badge> : <></>} {/*Panier avec quantité des commandes grâce au store redux */}
              </Cart>
            </MenuItem>
            </Link>
          </Right>
        </Wrapper>
    </Container>
  )
}

export default Navbar
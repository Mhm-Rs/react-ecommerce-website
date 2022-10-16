///Le panier

import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import Announcement from '../components/Announcement'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { mobile } from '../responsive'
import StripeCheckout from "react-stripe-checkout"
import { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const KEY = "pk_test_51LlyVNJ2zZsSBMy21EQ2IwPwdxlDccG4X4pOT1M5DQpcMat8dOVsQivJkJQqRRKfXq2HNhnl9I7QEgE8gDvtItDW00mo6ZNOJT" //pour stripe
const Container = styled.div``
const Wrapper = styled.div`
    padding:20px;
    ${mobile({ padding: "10px" })}
`
const Title = styled.h1`
    font-weight: 300;
    text-align:center;
`
const Top = styled.div`
    display:flex;
    align-items:center;
    justify-content: space-between;
    padding:20px;
`
const TopButton = styled.button`
    padding:10px;
    font-weight: 600;
    cursor:pointer;
    border: ${props=>props.type === "filled" && "none"};
    background-color: ${props=>props.type === "filled" ? "black" : "transparent"}; //props pour réutiliser le topButton et le changer en fonction de l'endroit
    color: ${props=>props.type === "filled" && "white"};
    &:hover{
        color:white;
        background-color: teal;
    }
    transition:all 0.5s ease;
    `
const TopTexts =  styled.div`
${mobile({ display: "none" })}
`
const TopText = styled.span`
    text-decoration:underline;
    cursor:pointer;
    margin:0px 10px;
`

const Bottom = styled.div`
    display: flex;
    justify-content: space-between;
    ${mobile({ flexDirection: "column" })}
`
const Info = styled.div`
    flex:3;
`

const Product = styled.div`
    display: flex;
    justify-content: space-between;
    ${mobile({ flexDirection: "column" })}
`
const ProductDetail = styled.div`
    flex:2;
    display: flex;
`

const Image = styled.img`
    width: 200px;
`
const Details = styled.div`
    padding:20px;
    display: flex;
    flex-direction:column;
    justify-content: space-around;
`
const ProductName = styled.span``
const ProductId = styled.span``
const ProductColor = styled.div`
    width:20px;
    height:20px;
    border-radius:50%;
    background-color:${props=>props.color};
`
const ProductSize = styled.span``
const PriceDetail = styled.div`
    flex:1;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction:column;
`
const ProductAmountContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom:20px;
`
const ProductAmount = styled.div`
    font-size: 24px;
    margin:5px;
    ${mobile({ margin: "5px 15px" })}
`
const ProductPrice = styled.div`
    font-size: 30px;
    font-weight: 200;
    ${mobile({ marginBottom: "20px" })}
`

const Hr = styled.hr`
    background-color:#eee;
    border:none;
    height:1px;
`

const Summary = styled.div`
    flex:1;
    border:0.5px solid lightgray;
    border-radius:10px;
    padding:20px;
    height:50vh;
`

const SummaryTitle = styled.h1`
    font-weight: 200;
`
const SummaryItem = styled.div`
    margin:30px 0px;
    display: flex;
    justify-content: space-between;
    font-weight:${props=>props.type==="total" && "500"};
    font-size: ${props=>props.type==="total" &&" 24px"} ;
 `
const SummaryItemText = styled.span``
const SummaryItemPrice = styled.span``
const Button = styled.button`
    width:100%;
    padding:10px;
    background-color:black;
    color:white;
    font-weight: 600;
    cursor:pointer;
    
`
const Cart = () => {
    const navigate = useNavigate(); //pour rediriger
    const cart = useSelector(state=>state.cart) //le cart provenant du redux store
    const quantity = useSelector(state=>state.cart.quantity) //la quantité provenant du redux store
    const [isDone,setIsDone] = useState(false) //pour savoir quand rediriger

    const onToken = (token) => {
        console.log("Achat effectue")
    }

    const handleClick = () => {
        navigate("/"); //rediriger à l'écran principal en cliquant sur le logo
        
    }

    const checkOut = () => {
        setTimeout(()=>{
            setIsDone(true)
        },25000);
    }
    useEffect(()=>{
        if(isDone){
            navigate("/success") //rediriger sur la page "succès" après paiement
        }
    },[isDone,navigate])
   

  return (
    <Container>
        <Announcement/>
        <Navbar/>
        <Wrapper>
            <Title>YOUR BAG</Title>
            <Top>
                <TopButton onClick={handleClick}>CONTINUE SHOPPING </TopButton>
                <TopTexts>
                    <TopText>Shopping Bag ({quantity})</TopText> {/* Nombre d'élts commandés*/}
                    <TopText>Your Wishlist(0)</TopText> {/* Nombre d'élts de la wishlist (non configuré)*/}
                </TopTexts> 
            </Top>
            <Bottom>
                <Info>
                    {cart.products.map(product=>(
                        <Product>
                        <ProductDetail>
                             <Image src={product.img} />
                             <Details>
                                <ProductName><b>Product :</b>{product.title}</ProductName>
                                <ProductId><b>ID :</b> {product._id}</ProductId>        {/* Elts du produit */}
                                <ProductColor color={product.color}/>       
                                <ProductSize><b>Size :</b> {product.size}</ProductSize> 
                             </Details>
                        </ProductDetail>
                        <PriceDetail>
                            <ProductAmountContainer>
                                <ProductAmount>{product.quantity}</ProductAmount> 
                                {/* quantité */}
                            </ProductAmountContainer>
                            <ProductPrice>$ {product.price*product.quantity}</ProductPrice>
                                {/* prix */}
                        </PriceDetail>
                    </Product>
              ))}
              
              <Hr/>
                </Info>
                <Summary>
                    <SummaryTitle>ORDER SUMMARY</SummaryTitle>
                    <SummaryItem>
                        <SummaryItemText>Subtotal</SummaryItemText>
                        <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
                    </SummaryItem>
                    <SummaryItem>
                    <SummaryItemText>Estimated Shipping</SummaryItemText>
                    <SummaryItemPrice>$ 5.90</SummaryItemPrice>
                    </SummaryItem>
                    <SummaryItem>
                    <SummaryItemText>Shipping Discount</SummaryItemText>
                    <SummaryItemPrice>- $ 4.90</SummaryItemPrice>
                    </SummaryItem>
                    <SummaryItem type="total">
                    <SummaryItemText>Total</SummaryItemText>
                    <SummaryItemPrice>$ {cart.total+1}</SummaryItemPrice> 
                    {/* prix total */}
                    </SummaryItem>
                    <StripeCheckout
                        name="Mhm_Rs Shop"
                        image="https://i.ibb.co/j61wZSM/rais.webp"
                        billingAddress
                        shippingAddress
                        description={`Your total is $ ${cart.total}`}
                        amount={cart.total*100}
                        token={onToken}
                        stripeKey={KEY}
                    >
                        {/* après le checkout, isDone est  mis à true et on est redirigé vers success */}
                    <Button onClick={checkOut}>CHECKOUT NOW</Button>
                    </StripeCheckout>
                </Summary>
            </Bottom>
        </Wrapper>
        <Footer/>
    </Container>
  )
}

export default Cart
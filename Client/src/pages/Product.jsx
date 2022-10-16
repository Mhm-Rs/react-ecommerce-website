import { useState } from "react"
import styled from "styled-components"
import Announcement from "../components/Announcement"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import Newsletter from "../components/Newsletter"
import { mobile } from "../responsive"
import { useEffect } from "react"
import { publicRequest } from "../requestMethods"
import {useLocation} from "react-router-dom"
import { addProduct } from "../redux/cartRedux"
import { useDispatch } from "react-redux"

const Container = styled.div`

`

const Wrapper = styled.div`
    padding: 50px;
    display: flex;
    ${mobile({ padding: "10px", flexDirection:"column" })}

`
const ImgContainer = styled.div`
    flex:1;
`
const Image = styled.img`
    width:100%;
    height:90vh;
    object-fit:cover;
    ${mobile({ height: "40vh" })}
`
const InfoContainer = styled.div`
    flex:1;
    padding: 0px 50px;
    ${mobile({ padding: "10px" })}
`
const Title = styled.h1`
    font-weight: 200;
`
const Desc = styled.p`
    margin: 20px 0px;
`
const Price = styled.span`
    font-weight: 100;
    font-size: 40px;
`

const FilterContainer = styled.div`
    display:flex;
    justify-content:space-between;
    width:50%;
    margin: 30px 0px;
    ${mobile({ width: "100%" })}
`
const Filter = styled.div`
    display: flex;
    align-items: center;

`
const FilterTitle = styled.span`
    font-size: 20px;
    font-weight: 200;
`
const FilterColor = styled.div`
    width:20px;
    height:20px;
    border-radius:50%;
    background-color:${props=>props.color};
    margin:0px 5px;
    cursor:pointer; //affiche les couleurs sous forme de petits cercles
`
const FilterSize = styled.select`
    margin-left: 10px;
    padding: 5px;
`


const FilterSizeOption = styled.option``

const AddContainer = styled.div`
    display:flex;
    align-items: center;
    justify-content: space-between;
    width:50%;
    ${mobile({ width: "100%" })}
`
const AmountContainer = styled.div`
    display: flex;
    align-items: center;
    font-weight: 700;
`
const Amount = styled.span`
    width: 30px;
    height: 30px;
    border-radius:10px;
    border:1px solid teal;
    display:flex;
    align-items: center;
    justify-content: center;
    margin:0px 5px;
`
const Button = styled.button`
    padding: 15px;
    border:2px solid teal;
    background-color:white;
    cursor:pointer;
    font-weight: 500;

    &:hover{
        background-color:#f8f4f4;
    }
`


const Product = () => {

    const location = useLocation(); //contient dans le champ pathname, l'id du produit
    const id = location.pathname.split("/")[2]; //l'id 
    const [product,setProduct] = useState({}); //le produit (pour le store)
    const [quantity,setQuantity] = useState(1) //la quantité de produit commandée (pour le store)
    const [color,setColor] = useState("") //la couleur (pour le store)
    const [size,setSize] = useState("") //la taille(pour le store)
    const dispatch = useDispatch();

    function handleQuantity(sign){ //augmenter ou diminuer la quantité en fonction du bouton appuyé
        if(sign==="plus"){
            setQuantity(prev=>prev+1)
        }
        else if(quantity>1){
            setQuantity(prev=>prev-1)
        }
        else{
            setQuantity(1)
        }
    }

    const handleCart = () => {
        //mettre à jour le cart
        dispatch(
            addProduct({
                ...product,
                quantity,
                color,
                size, //ajouter tous les éléments commandés
            })
        )
    }
    useEffect(()=>{
      const getProduct = async () => {
        try{
          const res = await publicRequest.get(`/products/find/${id}`) //requête pour récupérer un produit depuis la base de données mongo à partir de son id
          setProduct(res.data) //ajouter le produit au tableau
        }
        catch(err){

        }
      }
      getProduct();
    },[id])
  return (
    <Container>
        <Announcement/>
        <Navbar/>
        <Wrapper>
            <ImgContainer>
                <Image src={product.img} /> {/*image du produit */}
            </ImgContainer>
            <InfoContainer>
                <Title>{product.title}</Title> 
                <Desc>{product.desc}</Desc>
                <Price>$ {product.price}</Price>
                <FilterContainer>
                    <Filter>
                        <FilterTitle>Color</FilterTitle>
                        {product.color?.map((c)=>(
                            <FilterColor color={c} key={c} onClick={()=>setColor(c)}/> 
                        ))} {/*affichage de toutes les couleurs disponibles */}
                    
                    </Filter>
                    <Filter>
                        <FilterTitle>Size</FilterTitle>
                        <FilterSize onChange={(e)=>setSize(e.target.value)}>
                            {product.size?.map((size)=>(
                                <FilterSizeOption key={size}>{size}</FilterSizeOption>
                            ))} {/*affichage de toutes les tailles disponibles */}
                        </FilterSize>
                    </Filter>
                </FilterContainer>
                <AddContainer>
                    <AmountContainer>
                    <i className="fa-solid fa-minus" onClick={()=>handleQuantity("minus")}></i>
                    <Amount>{quantity}</Amount>
                    <i className="fa-solid fa-plus" onClick={()=>handleQuantity("plus")}></i> {/*augmenter ou diminuer la quantité */}
                    </AmountContainer>
                    <Button onClick={handleCart}>ADD TO CART</Button>
                </AddContainer>
            </InfoContainer>
        </Wrapper>
        <Newsletter/>
        <Footer/>
    </Container>
  )
}

export default Product
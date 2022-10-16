//slider de bienvenue avec les nouvelles offres (fonctionne comme un carousel)

import { useState } from "react"
import {useNavigate } from "react-router-dom"
import styled from "styled-components"
import {sliderItems} from "../data"
import { mobile } from "../responsive"

const Container = styled.div`
    width:100%;
    height:100vh;
    display:flex;
    overflow:hidden;
    position:relative;
    ${mobile({ display: "none" })}
`

const Arrow = styled.div`
    width:50px;
    height:50px;
    background-color:#fff7f7;
    border-radius:50%;
    display:flex;
    align-items:center;
    justify-content: center;
    position:absolute;
    top:0;
    bottom:0;
    margin:auto;
    left : ${props=> props.direction==="left" && "10px"}; // si le arrow a pour props left, il lui applique un CSS left:10px
    right: ${props=> props.direction==="right" && "10px"};  // si le arrow a pour props right, il lui applique un CSS right:10px
    cursor:pointer;
    opacity:0.5;
    z-index:2;
`

const Wrapper = styled.div`
    height:100%;
    display:flex;
    transform:translateX(${props=>props.slideIndex * -100}vw); //lorsqu'on change l'index, l'élément est décalé de 100vw vers la gauche (ou vers la droite),ce qui 
    transition:all 1.5s ease;                                  //fait à chaque fois apparaître un nouvel élément
    
`

const Slide = styled.div`
    width:100vw;
    height:100vh;
    display:flex;
    align-items:center;
    background-color:#${props=>props.bg}; //chaque élément a une taille de 100vw, et il y en a 3 côte à côte. Donc à chaque fois, deux éléments sont hors de l'écran
`

const ImgContainer = styled.div`
    height:100%;
    flex:1;
`

const Image = styled.img`
    height:80%;
`

const InfoContainer = styled.div`
    flex:1;
    padding:50px;
`

const Title = styled.h1`
    font-size:70px;
`

const Desc = styled.p`
    margin: 50px 0;
    font-size:20px;
    font-weight: 500;
    letter-spacing:3px;
`

const Button = styled.button`
    padding:10px;
    font-size: 20px;
    background-color:transparent;
    cursor:pointer;
    &:hover{
        color:white;
        background-color: teal;
    }
    transition:all 0.5s ease;
`
const Slider = () => {

    const [slideIndex,setSlideIndex] = useState(0) //index du slider, 0 1ère page, 1 2ème page, 2 3ème page
    const navigate = useNavigate();
    const handleClick = (direction) =>{
        if(direction==="left"){
            setSlideIndex(slideIndex > 0 ? slideIndex-1 : sliderItems.length-1) //on diminue ou augmente l'index en fonction de si on appuie sur droite ou gauche
        }
        else{
            setSlideIndex(slideIndex < sliderItems.length-1 ? slideIndex+1 : 0)
        }
    }

    const redirect = () => {
        navigate("/products/women")
    }

  return (
    <Container>
        <Arrow direction="left" onClick={()=>handleClick("left")}>
            <i className="fa-solid fa-arrow-left"></i>
        </Arrow>
        <Wrapper slideIndex = {slideIndex}>
            {sliderItems.map(item=>{
                return(
                    <Slide bg={item.bg} key={item.id}>  {/*pour générer chaque élément du slider */}
                        <ImgContainer>
                            <Image src={item.img} />
                        </ImgContainer>
                        <InfoContainer>
                            <Title>{item.title}</Title>
                            <Desc>{item.desc}</Desc>
                            <Button onClick={redirect}>SHOP NOW</Button>
                        </InfoContainer>
                </Slide>
            )})}
        </Wrapper>
        <Arrow direction="right" onClick={()=>handleClick("right")}>
            <i className="fa-solid fa-arrow-right"></i>
        </Arrow>
    </Container>
  )
}

export default Slider
import styled from "styled-components"
import "./icons.css"
import {Link} from "react-router-dom"

const Info = styled.div`
  opacity:0;
  width:100%;
  height:100%;
  position:absolute;
  top:0;
  left:0;
  background-color:rgba(0,0,0,0.2);
  z-index:3;
  display:flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  cursor:pointer;
`

const Container = styled.div` //le rectangle bleu qui sert de background à l'image
 
 flex:1;
  margin:5px;
  min-width:280px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color:#f5fbfd;
  position:relative;
  &:hover ${Info} {
      opacity:1;
  }
`
const Circle = styled.div`
  width: 200px;
  height:200px;
  border-radius:50%;
  background-color:white;
  position:absolute;

`
const Image = styled.img`
  height:75%;
  z-index:2;
`
const Icon = styled.div`
  width:40px;
  height:40px;
  border-radius:50%;
  background-color:white;
  display:flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;

  &:hover{
      background-color:#e9f5f5;
      transform:scale(1.1); 
  }
`

const ProductItem = ({item}) => {
   
  return (
    <Container>
        <Circle />
        <Image src={item.img} /> {/*Image du produit dans le cercle */}
        <Info>
          <Icon>
            <i className="fa-solid fa-bag-shopping"></i> {/*icone shopping pour voir la catégorie (pas configuré)*/}
          </Icon>
          <Icon>
            <Link to={`/product/${item._id}`} className="link">
            <i className="fa-brands fa-searchengin"></i> {/*icone de recherche - redirige vers la page du produit individuel*/}
            </Link>
          </Icon>
          <Icon>
            <i className="fa-solid fa-heart"></i> {/*icone de coeur pour ajouter à la wishlist (pas configuré)*/}
          </Icon>
        </Info>
    </Container>
  )
}

export default ProductItem
//La page permettant d'afficher les produits 

import { useEffect, useState } from "react"
import styled from "styled-components"
import ProductItem from "./ProductItem"
import axios from "axios" //pour les requêtes et les filtres
const Container = styled.div`
    padding:20px;
    display:flex;
    flex-wrap:wrap;
    justify-content:space-between;
`

const Products = ({cat,filters,sort}) => {
    const [products,setProducts] = useState([]);
    const [filteredProducts,setFilteredProducts] = useState([]); //produits et produits filtrés


    useEffect(()=>{
        const getProducts = async () =>{
            try{
                const res = await axios.get(cat ? `http://localhost:5000/api/products?category=${cat}` : "http://localhost:5000/api/products/"); 
                //requête pour récupérer les produits correspondant à une catégorie s'il y en a une

                setProducts(res.data); //on range dans le tableau produits les produits obtenus par l'api, venant de mongo.
            }
            catch(err){
            }
        }
        getProducts();
    },[cat])

    useEffect(()=>{
        cat && setFilteredProducts(
            products.filter((item)=>
                Object.entries(filters).every(([key,value]) => 
                    item[key].includes(value) 
                    //permet de filtrer les produits et n'ajouter dans filteredProducts que ceux qui respectent de certaines condition
                )
            )
        )
    },[products,cat,filters])

    useEffect(()=>{
        if(sort==="newest"){
            setFilteredProducts(prev=>
                [...prev].sort((a,b) => a.createdAt - b.createdAt)
                //trier produits par ordre de nouveauté
                );
        }
        else if(sort==="asc"){
            setFilteredProducts(prev=>
                [...prev].sort((a,b) => a.price - b.price)
                //trier produits par ordre croissant de prix
                );
        }
        else {
            setFilteredProducts(prev=>
                [...prev].sort((a,b) => b.price - a.price)
                );
                //trier produits par ordre décroissant de prix
        }
    },[sort])
  return (
    <Container>
        {cat ? filteredProducts.map(item => {
            return (
                <ProductItem item={item} key={item.id}/>
            )
        }) :                            //s'il y a une catégorie, afficher les produits filtrés. Sinon afficher 8 produits de la base de données mongo.
        products
        .slice(0,8)
        .map(item => {
            return (
                <ProductItem item={item} key={item.id}/>
            )
        }) 
        }
    </Container>
    
    )
}

export default Products
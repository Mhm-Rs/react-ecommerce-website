//Affiche la liste des produits résultant d'un filtre comme la catégorie, le prix...
import { useState } from "react"
import { useLocation } from "react-router-dom"
import styled from "styled-components"
import Announcement from "../components/Announcement"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import Newsletter from "../components/Newsletter"
import Products from "../components/Products"
import { mobile } from "../responsive"


const Container = styled.div``

const Title = styled.h1`
    margin: 20px;
`
const FilterContainer = styled.div`
    display: flex;
    justify-content:space-between;

`
const Filter = styled.div`
    margin: 20px;
    ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}

`   

const FilterText = styled.span`
    font-size: 20px;
    font-weight: 600;
    margin-right: 20px;
    ${mobile({ marginRight: "0px" })}
`

const Select = styled.select`
    padding: 10px;
    margin-right: 20px;
    ${mobile({ margin: "10px 0px" })}
`
const Option = styled.option``

const ProductList = () => {
    const location = useLocation(); //pour avoir dans le champ pathname la catégorie nécessaire
    const cat = location.pathname.split("/")[2]; //la catégorie 
    const [filters,setFilters] = useState({})
    const [sort,setSort] = useState("newest"); //le critère de filtre
    
    const handleFilters = (event) => {
        const value = event.target.value;
        setFilters({
            ...filters,
            [event.target.name] : value, //ajouter tous les filtres dans un même tableau
        })
    }
  return (
    <Container>
        <Announcement/>
        <Navbar/>
        <Title>{cat.charAt(0).toUpperCase()+cat.slice(1)}</Title> {/* catégorie avec première lettre en majuscule*/}
        <FilterContainer>
            <Filter>
                <FilterText>Filter Products:</FilterText>
                <Select name="color" onChange={handleFilters}>  {/* onchange pour ajouter la couleur sélectionnée aux filtres */}
                    <Option disabled>
                        Color
                    </Option>
                    <Option>white</Option>
                    <Option>black</Option>
                    <Option>red</Option>
                    <Option>yellow</Option> {/*Les options de couleurs */}
                    <Option>blue</Option>
                    <Option>green</Option>
                </Select>  
                <Select name="size" onChange={handleFilters}> {/* onchange pour ajouter la taille sélectionnée aux filtres */}
                    <Option disabled>
                        Size 
                    </Option>
                    <Option>XS</Option>
                    <Option>S</Option>
                    <Option>M</Option>  {/*Les options de taille */}
                    <Option>L</Option>
                    <Option>XL</Option>   
                </Select>  
            </Filter>
            <Filter>
                <FilterText>Sort Products:</FilterText>
                <Select onChange={(event)=> setSort(event.target.value)}>
                    <Option value="newest">Newest</Option>
                    <Option value="asc">Price (asc)</Option> {/* Options de réarrangement */}
                    <Option value="desc">Price (desc)</Option>
            </Select>
            </Filter>
        </FilterContainer>
        <Products cat={cat} filters={filters} sort={sort} /> {/* On envoie la catégorie, les filtres et le réarrangement choisi à la page products */}
        <Newsletter/>
        <Footer/>
    </Container>
  )
}

export default ProductList
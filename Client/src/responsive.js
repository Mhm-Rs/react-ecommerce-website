//pour le responsive sur des écrans de longueur < 380px

import {css} from "styled-components"

export const mobile = (props) =>{ 
    return css`
    @media only screen and (max-width:380px){
      ${props}
    }`
}
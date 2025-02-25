import { HeaderContainer } from "./styles";
import LogoIgnite from '../../Assets/logo-ignite.svg'
import { NavLink } from "react-router-dom";
import { Scroll, Timer } from "phosphor-react";

export function Header(){ //criação da função Header
    return(
        <HeaderContainer>
            <img src={LogoIgnite}  alt=""/>
            <nav>
             <NavLink to={"/"} title="Timer">
                <Timer size={24}/>
             </NavLink>
             <NavLink to={"/history"} title="Historico">
                <Scroll size={24}/>
             </NavLink>
            </nav>
        </HeaderContainer>
    )
}
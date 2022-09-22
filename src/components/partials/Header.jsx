
import { NavBar } from "./NavBar"
import Styles from "./Header.module.scss"
import logo from "../../Assets/Images/Logo.png"
import { Link } from "react-router-dom"
import { BurgerMenu } from "../App/BurgerMenu/BurgerMenu"

export const Header = () => {
    return (
      <header className={Styles.headerContainer}>
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
        
        <NavBar />
        
        <BurgerMenu />
      </header>
    )
}
